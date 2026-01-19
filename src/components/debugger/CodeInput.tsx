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
    gradient: "from-fuchsia-500 to-violet-600",
    bgColor: "bg-fuchsia-500/15",
    textColor: "text-fuchsia-600 dark:text-fuchsia-400",
    borderColor: "border-fuchsia-500/40",
    glowColor: "shadow-fuchsia-500/20",
  },
  logs: {
    icon: FileText,
    title: "Log Parser",
    description: "Get explanations and debugging recommendations",
    placeholder: "Paste your error logs here...\n\nExample:\n[ERROR] 2024-01-15 10:23:45 - Connection refused to database\n[WARN] 2024-01-15 10:23:46 - Retrying connection (attempt 1/3)\n[ERROR] 2024-01-15 10:23:47 - Max retries exceeded",
    gradient: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/15",
    textColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-500/40",
    glowColor: "shadow-amber-500/20",
  },
  stacktrace: {
    icon: AlertTriangle,
    title: "Stack Trace Explainer",
    description: "Plain-language explanation of errors",
    placeholder: "Paste your stack trace here...\n\nExample:\nTypeError: Cannot read property 'map' of undefined\n    at UserList.render (UserList.tsx:15:20)\n    at renderWithHooks (react-dom.js:1234:22)\n    at mountIndeterminateComponent (react-dom.js:5678:12)",
    gradient: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-500/15",
    textColor: "text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-500/40",
    glowColor: "shadow-rose-500/20",
  },
  review: {
    icon: Search,
    title: "Code Review",
    description: "Quality assessment & refactoring suggestions",
    placeholder: "Paste your code here for a comprehensive review...\n\nWe'll analyze:\n• Code quality and readability\n• Design patterns and architecture\n• Error handling and edge cases\n• Naming conventions\n• Potential improvements",
    gradient: "from-cyan-500 to-teal-600",
    bgColor: "bg-cyan-500/15",
    textColor: "text-cyan-600 dark:text-cyan-400",
    borderColor: "border-cyan-500/40",
    glowColor: "shadow-cyan-500/20",
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
    <Card className={`card-glow overflow-hidden border-2 ${currentConfig.borderColor}`}>
      <CardContent className="p-0">
        {/* Tab Selection */}
        <div className="grid grid-cols-4 border-b border-border bg-gradient-to-r from-fuchsia-500/5 via-violet-500/5 to-cyan-500/5">
          {(Object.entries(tabConfig) as [DebugType, typeof currentConfig][]).map(([key, config]) => {
            const TabIcon = config.icon;
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`
                  relative flex flex-col items-center gap-1.5 p-4 transition-all duration-300
                  ${isActive ? `${config.bgColor} ${config.borderColor} border-b-2 shadow-lg ${config.glowColor}` : 'hover:bg-secondary/50 border-b-2 border-transparent'}
                `}
              >
                <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? `bg-gradient-to-br ${config.gradient} shadow-lg scale-110` : 'bg-muted'}`}>
                  <TabIcon className={`h-4 w-4 transition-colors ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <span className={`text-xs font-bold transition-colors hidden sm:block ${isActive ? config.textColor : 'text-muted-foreground'}`}>
                  {config.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${currentConfig.gradient} shadow-lg`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold text-lg ${currentConfig.textColor}`}>{currentConfig.title}</h3>
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
              className={`gap-2 rounded-xl px-6 bg-gradient-to-r ${currentConfig.gradient} hover:opacity-90 transition-all shadow-lg text-white border-0`}
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
