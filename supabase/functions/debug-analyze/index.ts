import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const systemPrompts = {
  analyze: `You are an expert code analyzer and debugger. Your task is to analyze code for:
- Bugs and potential errors
- Security vulnerabilities
- Performance issues
- Code quality problems
- Best practice violations

Provide a structured analysis with:
1. **Issues Found** - List each issue with severity (Critical, Warning, Info)
2. **Detailed Explanation** - Explain why each issue is problematic
3. **Suggested Fixes** - Provide corrected code snippets
4. **Best Practices** - Recommend improvements

Format your response in clear markdown.`,

  logs: `You are an expert log analyzer and error parser. Your task is to:
- Parse error logs and identify the root cause
- Explain what the error means in plain language
- Identify patterns in log sequences
- Suggest debugging steps and fixes

Provide a structured analysis with:
1. **Error Summary** - Quick overview of the errors found
2. **Root Cause Analysis** - What's causing these errors
3. **Timeline** - Sequence of events if applicable
4. **Recommended Actions** - Step-by-step debugging guide
5. **Prevention Tips** - How to prevent these errors in the future

Format your response in clear markdown.`,

  stacktrace: `You are an expert at explaining stack traces and error messages. Your task is to:
- Break down the stack trace into understandable components
- Explain what happened at each level
- Identify the exact line and file causing the issue
- Provide context about the error type

Provide a structured explanation with:
1. **Error Type** - What kind of error this is
2. **Plain Language Explanation** - What this means for non-experts
3. **Stack Trace Breakdown** - Line-by-line explanation
4. **The Culprit** - The specific code causing the issue
5. **How to Fix** - Concrete steps to resolve the error

Format your response in clear markdown.`,

  review: `You are a senior code reviewer providing comprehensive code reviews. Your task is to:
- Evaluate code quality, readability, and maintainability
- Check for design patterns and architectural issues
- Assess error handling and edge cases
- Review naming conventions and documentation
- Identify code smells and anti-patterns

Provide a structured review with:
1. **Overall Assessment** - Summary score and general impression
2. **Strengths** - What the code does well
3. **Areas for Improvement** - What needs work
4. **Specific Recommendations** - Detailed suggestions with code examples
5. **Refactoring Suggestions** - How to restructure for better quality

Format your response in clear markdown with code examples.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.error("Missing or invalid Authorization header");
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims?.sub) {
      console.error("JWT validation failed:", claimsError?.message || "No user ID in claims");
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log(`Authenticated request from user: ${userId}`);

    const { type, content, language } = await req.json();

    if (!type || !content) {
      return new Response(
        JSON.stringify({ error: "Missing 'type' or 'content' in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = systemPrompts[type as keyof typeof systemPrompts];
    if (!systemPrompt) {
      return new Response(
        JSON.stringify({ error: "Invalid type. Use: analyze, logs, stacktrace, or review" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userMessage = language 
      ? `Language: ${language}\n\nCode/Content:\n\`\`\`\n${content}\n\`\`\``
      : `Content:\n\`\`\`\n${content}\n\`\`\``;

    console.log(`Processing ${type} request for content length: ${content.length}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Streaming response started");
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Debug function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
