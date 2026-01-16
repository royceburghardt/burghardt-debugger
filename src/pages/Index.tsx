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
      gradient: "from-violet-500 to-purple-600",
      shadowColor: "shadow-violet-500/25",
    },
    {
      icon: FileText,
      title: "Log Parser",
      description: "Understand error logs instantly",
      gradient: "from-amber-500 to-orange-600",
      shadowColor: "shadow-amber-500/25",
    },
    {
      icon: AlertTriangle,
      title: "Stack Traces",
      description: "Plain-language explanations",
      gradient: "from-rose-500 to-pink-600",
      shadowColor: "shadow-rose-500/25",
    },
    {
      icon: Search,
      title: "Code Review",
      description: "Quality & refactoring tips",
      gradient: "from-emerald-500 to-teal-600",
      shadowColor: "shadow-emerald-500/25",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Colorful Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-violet-500/30 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-500/25 to-teal-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br from-pink-500/20 to-rose-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-orange-600/10 rounded-full blur-3xl" />
      </div>

      <DebuggerHeader />
      
      <main className="container relative py-10 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 pb-4 animate-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 text-violet-600 dark:text-violet-400 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            AI-Powered Debugging Tool
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Debug Smarter with{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
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
                    group flex items-center gap-3 px-4 py-3 rounded-2xl
                    bg-card/80 backdrop-blur-sm border border-border
                    hover:border-transparent hover:shadow-xl ${feature.shadowColor}
                    transition-all duration-300 hover:-translate-y-1 cursor-default
                    animate-in stagger-${index + 1}
                  `}
                  style={{ opacity: 0 }}
                >
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-semibold">{feature.title}</span>
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
        <section className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm animate-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Secure & Private</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Zap className="h-4 w-4" />
            <span className="font-medium">Real-time Analysis</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <Bug className="h-4 w-4" />
            <span className="font-medium">Any Language</span>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pt-8 border-t border-border/50">
          <p className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600">
              <Sparkles className="h-3 w-3 text-white" />
            </span>
            Powered by advanced AI models
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
