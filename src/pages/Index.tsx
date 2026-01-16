import { DebuggerHeader } from "@/components/debugger/DebuggerHeader";
import { CodeInput, DebugType } from "@/components/debugger/CodeInput";
import { ResultDisplay } from "@/components/debugger/ResultDisplay";
import { useDebugger } from "@/hooks/useDebugger";
import { Bug, Zap, Shield, Sparkles, Code, FileText, AlertTriangle, Search } from "lucide-react";

const Index = () => {
  const { result, isLoading, isStreaming, analyze } = useDebugger();

  const handleSubmit = (type: DebugType, content: string, language?: string) => {
    analyze(type, content, language);
  };

  const features = [
    {
      icon: Code,
      title: "Code Analysis",
      description: "Find bugs and security issues",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: FileText,
      title: "Log Parser",
      description: "Understand error logs instantly",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      icon: AlertTriangle,
      title: "Stack Traces",
      description: "Plain-language explanations",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      icon: Search,
      title: "Code Review",
      description: "Quality & refactoring tips",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background hero-gradient">
      <DebuggerHeader />
      
      <main className="container py-10 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 pb-4 animate-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            AI-Powered Debugging Tool
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Debug Smarter with{" "}
            <span className="gradient-text">
              Burghardt
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Paste any code, error log, or stack trace and get instant AI-powered analysis. 
            Works with any programming language.
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl border border-border
                    bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300
                    hover:-translate-y-1 hover:shadow-lg cursor-default
                    animate-in stagger-${index + 1}
                  `}
                  style={{ opacity: 0 }}
                >
                  <div className={`p-1.5 rounded-lg ${feature.bgColor}`}>
                    <Icon className={`h-4 w-4 ${feature.color}`} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium">{feature.title}</span>
                    <p className="text-xs text-muted-foreground hidden sm:block">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2 animate-in" style={{ animationDelay: '0.3s' }}>
          <CodeInput onSubmit={handleSubmit} isLoading={isLoading} />
          <ResultDisplay result={result} isStreaming={isStreaming} />
        </div>

        {/* Trust Indicators */}
        <section className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-foreground animate-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-success" />
            <span>Secure & Private</span>
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-warning" />
            <span>Real-time Analysis</span>
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <Bug className="h-4 w-4 text-primary" />
            <span>Any Language</span>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
          <p className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Powered by advanced AI models
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
