import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { DebugType } from "@/components/debugger/CodeInput";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/debug-analyze`;

export const useDebugger = () => {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const { toast } = useToast();

  const analyze = useCallback(async (type: DebugType, content: string, language?: string) => {
    setIsLoading(true);
    setIsStreaming(true);
    setResult("");

    try {
      // Get authenticated user's session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to use the debugger.",
          variant: "destructive",
        });
        throw new Error("Authentication required");
      }

      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ type, content, language }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 429) {
          toast({
            title: "Rate limit exceeded",
            description: "Please wait a moment before trying again.",
            variant: "destructive",
          });
          throw new Error("Rate limit exceeded");
        }
        
        if (response.status === 402) {
          toast({
            title: "Credits exhausted",
            description: "Please add credits to continue using the debugger.",
            variant: "destructive",
          });
          throw new Error("Credits exhausted");
        }
        
        throw new Error(errorData.error || "Failed to analyze");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullResult = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullResult += content;
              setResult(fullResult);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullResult += content;
              setResult(fullResult);
            }
          } catch { /* ignore */ }
        }
      }

      toast({
        title: "Analysis complete",
        description: "Your code has been analyzed successfully.",
      });
    } catch (error) {
      console.error("Debug error:", error);
      if (error instanceof Error && !error.message.includes("Rate limit") && !error.message.includes("Credits")) {
        toast({
          title: "Analysis failed",
          description: error.message || "An error occurred during analysis.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }, [toast]);

  const clearResult = useCallback(() => {
    setResult("");
  }, []);

  return {
    result,
    isLoading,
    isStreaming,
    analyze,
    clearResult,
  };
};
