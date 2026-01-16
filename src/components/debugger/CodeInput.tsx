import { useState } from "react";
import { Code, FileText, AlertTriangle, Search, Loader2, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export type DebugType = "analyze" | "logs" | "stacktrace" | "review";

interface CodeInputProps {
  onSubmit: (type: DebugType, content: string, language?: string) => void;
  isLoading: boolean;
}

const languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "SQL",
  "HTML/CSS",
  "Shell/Bash",
  "Other",
];

const tabConfig = {
  analyze: {
    icon: Code,
    title: "Code Analysis",
    description: "Find bugs, security issues & get improvement suggestions",
    placeholder: "Paste your code here for analysis...\n\nExample:\nfunction calculateTotal(items) {\n  let total = 0;\n  for (i = 0; i < items.length; i++) {\n    total += items[i].price;\n  }\n  return total;\n}",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  logs: {
    icon: FileText,
    title: "Log Parser",
    description: "Get explanations and debugging recommendations",
    placeholder: "Paste your error logs here...\n\nExample:\n[ERROR] 2024-01-15 10:23:45 - Connection refused to database\n[WARN] 2024-01-15 10:23:46 - Retrying connection (attempt 1/3)\n[ERROR] 2024-01-15 10:23:47 - Max retries exceeded",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/20",
  },
  stacktrace: {
    icon: AlertTriangle,
    title: "Stack Trace Explainer",
    description: "Plain-language explanation of errors",
    placeholder: "Paste your stack trace here...\n\nExample:\nTypeError: Cannot read property 'map' of undefined\n    at UserList.render (UserList.tsx:15:20)\n    at renderWithHooks (react-dom.js:1234:22)\n    at mountIndeterminateComponent (react-dom.js:5678:12)",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
  },
  review: {
    icon: Search,
    title: "Code Review",
    description: "Quality assessment & refactoring suggestions",
    placeholder: "Paste your code here for a comprehensive review...\n\nWe'll analyze:\n• Code quality and readability\n• Design patterns and architecture\n• Error handling and edge cases\n• Naming conventions\n• Potential improvements",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
  },
};

export const CodeInput = ({ onSubmit, isLoading }: CodeInputProps) => {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<DebugType>("analyze");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(activeTab, content, language || undefined);
  };

  const currentConfig = tabConfig[activeTab];
  const Icon = currentConfig.icon;

  return (
    <Card className="card-glow overflow-hidden">
      <CardContent className="p-0">
        {/* Tab Selection */}
        <div className="grid grid-cols-4 border-b border-border">
          {(Object.entries(tabConfig) as [DebugType, typeof currentConfig][]).map(([key, config]) => {
            const TabIcon = config.icon;
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`
                  relative flex flex-col items-center gap-1.5 p-4 transition-all duration-200
                  ${isActive ? config.bgColor : 'hover:bg-secondary/50'}
                `}
              >
                <TabIcon className={`h-5 w-5 transition-colors ${isActive ? config.color : 'text-muted-foreground'}`} />
                <span className={`text-xs font-medium transition-colors hidden sm:block ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {config.title.split(' ')[0]}
                </span>
                {isActive && (
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${config.bgColor.replace('/10', '')}`} />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${currentConfig.bgColor} ${currentConfig.borderColor} border`}>
              <Icon className={`h-6 w-6 ${currentConfig.color}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{currentConfig.title}</h3>
              <p className="text-sm text-muted-foreground">{currentConfig.description}</p>
            </div>
          </div>

          {/* Language Selector */}
          {(activeTab === "analyze" || activeTab === "review") && (
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full sm:w-[200px] rounded-xl">
                <SelectValue placeholder="Select language (optional)" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Code Input */}
          <div className="relative">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={currentConfig.placeholder}
              className="min-h-[280px] font-mono text-sm rounded-xl resize-y bg-[hsl(var(--code-bg))] border-[hsl(var(--code-border))] focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
            />
            {!content && (
              <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                AI Ready
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-mono">
                {content.length.toLocaleString()} chars
              </span>
              {content.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  • {content.split('\n').length} lines
                </span>
              )}
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isLoading}
              size="lg"
              className="gap-2 rounded-xl px-6 gradient-primary hover:opacity-90 transition-opacity shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
