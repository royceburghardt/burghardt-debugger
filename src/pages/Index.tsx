import { DebuggerHeader } from "@/components/debugger/DebuggerHeader";
import { CodeInput, DebugType } from "@/components/debugger/CodeInput";
import { ResultDisplay } from "@/components/debugger/ResultDisplay";
import { useDebugger } from "@/hooks/useDebugger";
import { Bug, Zap, Shield, Sparkles, Code, FileText, AlertTriangle, Search, Heart, Star, Rocket } from "lucide-react";

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
      gradient: "from-fuchsia-500 to-violet-600",
      shadowColor: "shadow-fuchsia-500/25",
      bgGlow: "bg-fuchsia-500/20",
    },
    {
      icon: FileText,
      title: "Log Parser",
      description: "Understand error logs instantly",
      gradient: "from-amber-500 to-orange-600",
      shadowColor: "shadow-amber-500/25",
      bgGlow: "bg-amber-500/20",
    },
    {
      icon: AlertTriangle,
      title: "Stack Traces",
      description: "Plain-language explanations",
      gradient: "from-rose-500 to-pink-600",
      shadowColor: "shadow-rose-500/25",
      bgGlow: "bg-rose-500/20",
    },
    {
      icon: Search,
      title: "Code Review",
      description: "Quality & refactoring tips",
      gradient: "from-cyan-500 to-teal-600",
      shadowColor: "shadow-cyan-500/25",
      bgGlow: "bg-cyan-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Vibrant Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-fuchsia-500/40 via-violet-600/30 to-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-500/35 via-teal-500/25 to-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/3 w-80 h-80 bg-gradient-to-br from-rose-500/30 via-pink-500/20 to-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-amber-500/30 via-yellow-500/20 to-lime-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-10 w-40 h-40 bg-gradient-to-br from-indigo-500/25 to-purple-500/15 rounded-full blur-2xl" />
      </div>

      <DebuggerHeader />
      
      <main className="container relative py-10 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 pb-4 animate-in">
          {/* Creator Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500/20 via-fuchsia-500/20 to-violet-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-sm font-medium shadow-lg shadow-rose-500/10">
            <Star className="h-4 w-4 text-amber-500" />
            A <span className="font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Royce Burghardt</span> Creation
            <Heart className="h-4 w-4 text-rose-500 animate-pulse" />
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium">
            <Sparkles className="h-4 w-4 animate-pulse" />
            AI-Powered Debugging Tool
            <Rocket className="h-4 w-4" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Debug Smarter with{" "}
            <span className="bg-gradient-to-r from-fuchsia-500 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Burghardt
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Paste any code, error log, or stack trace and get instant AI-powered analysis. 
            <span className="block mt-1 font-medium bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
              Works with any programming language.
            </span>
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className={`
                    group flex items-center gap-3 px-5 py-4 rounded-2xl
                    bg-card/80 backdrop-blur-sm border-2 border-border
                    hover:border-transparent hover:shadow-2xl ${feature.shadowColor}
                    transition-all duration-300 hover:-translate-y-2 cursor-default
                    animate-in stagger-${index + 1}
                  `}
                  style={{ opacity: 0 }}
                >
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold">{feature.title}</span>
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
        <section className="flex flex-wrap items-center justify-center gap-4 pt-8 text-sm animate-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Secure & Private</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-lg shadow-amber-500/10">
            <Zap className="h-4 w-4" />
            <span className="font-medium">Real-time Analysis</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 border border-fuchsia-500/30 text-fuchsia-600 dark:text-fuchsia-400 shadow-lg shadow-fuchsia-500/10">
            <Bug className="h-4 w-4" />
            <span className="font-medium">Any Language</span>
          </div>
        </section>

        {/* Footer with Royce Burghardt branding */}
        <footer className="text-center pt-10 pb-4 border-t border-gradient-to-r from-transparent via-border to-transparent">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500/10 via-fuchsia-500/10 to-violet-500/10 border border-rose-500/20">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
                  Created by Royce Burghardt
                </p>
                <p className="text-xs text-muted-foreground">Powered by advanced AI models</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              Made with <Heart className="h-3 w-3 text-rose-500 animate-pulse" /> and AI
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
