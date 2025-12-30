import { DebuggerHeader } from "@/components/debugger/DebuggerHeader";
import { CodeInput, DebugType } from "@/components/debugger/CodeInput";
import { ResultDisplay } from "@/components/debugger/ResultDisplay";
import { useDebugger } from "@/hooks/useDebugger";
import { Bug, Zap, Shield, Sparkles } from "lucide-react";

const Index = () => {
  const { result, isLoading, isStreaming, analyze } = useDebugger();

  const handleSubmit = (type: DebugType, content: string, language?: string) => {
    analyze(type, content, language);
  };

  return (
    <div className="min-h-screen bg-background">
      <DebuggerHeader />
      
      <main className="container py-8 space-y-8">
        <section className="text-center space-y-4 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="gradient-primary bg-clip-text text-transparent">
              Burghardt Debugger
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered debugging assistant that analyzes code, parses error logs, 
            explains stack traces, and provides comprehensive code reviews.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm">
              <Bug className="h-4 w-4 text-primary" />
              Bug Detection
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm">
              <Zap className="h-4 w-4 text-warning" />
              Real-time Analysis
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm">
              <Shield className="h-4 w-4 text-destructive" />
              Security Scanning
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm">
              <Sparkles className="h-4 w-4 text-accent" />
              AI Suggestions
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <CodeInput onSubmit={handleSubmit} isLoading={isLoading} />
          <ResultDisplay result={result} isStreaming={isStreaming} />
        </div>

        <footer className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
          <p>Powered by advanced AI models • Supports multiple programming languages</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
