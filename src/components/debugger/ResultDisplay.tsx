import { useState, useEffect, useRef } from "react";
import { Copy, Check, Terminal, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ResultDisplayProps {
  result: string;
  isStreaming: boolean;
}

export const ResultDisplay = ({ result, isStreaming }: ResultDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStreaming && resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [result, isStreaming]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The analysis result has been copied.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  if (!result && !isStreaming) {
    return (
      <Card className="card-glow h-full border-2 border-dashed border-violet-500/20">
        <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center floating shadow-xl shadow-violet-500/30">
              <Terminal className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Ready to Analyze</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            Paste your code, logs, or stack traces on the left and click analyze to get AI-powered insights.
          </p>
          <div className="flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 animate-pulse" />
            AI is standing by
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-glow overflow-hidden border-2">
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-violet-500/5 to-purple-500/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
            <Terminal className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Analysis Result</span>
              {isStreaming && (
                <span className="inline-flex items-center gap-1.5 text-xs font-normal px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Streaming
                </span>
              )}
            </h3>
            <p className="text-xs text-muted-foreground">
              {result.split('\n').length} lines • {result.length.toLocaleString()} chars
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-1.5 rounded-lg"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
          {result && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5 rounded-lg"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-success" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      
      {isExpanded && (
        <CardContent className="p-4">
          <div
            ref={resultRef}
            className="code-block max-h-[500px] overflow-y-auto whitespace-pre-wrap leading-relaxed"
          >
            {result || (
              <span className="text-muted-foreground flex items-center gap-2">
                <span className="shimmer inline-block w-3 h-3 rounded" />
                Analyzing your code...
              </span>
            )}
            {isStreaming && <span className="typing-cursor" />}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
