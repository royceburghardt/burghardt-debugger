import { useState, useEffect, useRef } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ResultDisplayProps {
  result: string;
  isStreaming: boolean;
}

export const ResultDisplay = ({ result, isStreaming }: ResultDisplayProps) => {
  const [copied, setCopied] = useState(false);
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

  if (!result && !isStreaming) return null;

  return (
    <Card className="terminal-glow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          Analysis Result
          {isStreaming && (
            <span className="inline-block w-2 h-4 bg-primary animate-terminal-blink ml-1" />
          )}
        </CardTitle>
        {result && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
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
      </CardHeader>
      <CardContent>
        <div
          ref={resultRef}
          className="code-block max-h-[600px] overflow-y-auto whitespace-pre-wrap"
        >
          {result || (
            <span className="text-muted-foreground">Waiting for response...</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
