import { useState } from "react";
import { Code, FileText, AlertTriangle, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export const CodeInput = ({ onSubmit, isLoading }: CodeInputProps) => {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<DebugType>("analyze");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(activeTab, content, language || undefined);
  };

  const tabConfig = {
    analyze: {
      icon: Code,
      title: "Code Analysis",
      description: "Paste your code to find bugs, security issues, and get improvement suggestions",
      placeholder: "Paste your code here for analysis...\n\nExample:\nfunction calculateTotal(items) {\n  let total = 0;\n  for (i = 0; i < items.length; i++) {\n    total += items[i].price;\n  }\n  return total;\n}",
    },
    logs: {
      icon: FileText,
      title: "Log Parser",
      description: "Paste error logs to get explanations and debugging recommendations",
      placeholder: "Paste your error logs here...\n\nExample:\n[ERROR] 2024-01-15 10:23:45 - Connection refused to database\n[WARN] 2024-01-15 10:23:46 - Retrying connection (attempt 1/3)\n[ERROR] 2024-01-15 10:23:47 - Max retries exceeded",
    },
    stacktrace: {
      icon: AlertTriangle,
      title: "Stack Trace Explainer",
      description: "Paste a stack trace to get a plain-language explanation of the error",
      placeholder: "Paste your stack trace here...\n\nExample:\nTypeError: Cannot read property 'map' of undefined\n    at UserList.render (UserList.tsx:15:20)\n    at renderWithHooks (react-dom.js:1234:22)\n    at mountIndeterminateComponent (react-dom.js:5678:12)",
    },
    review: {
      icon: Search,
      title: "Code Review",
      description: "Get a comprehensive code review with quality assessment and refactoring suggestions",
      placeholder: "Paste your code here for a comprehensive review...\n\nWe'll analyze:\n• Code quality and readability\n• Design patterns and architecture\n• Error handling and edge cases\n• Naming conventions\n• Potential improvements",
    },
  };

  const currentConfig = tabConfig[activeTab];
  const Icon = currentConfig.icon;

  return (
    <Card className="terminal-glow">
      <CardHeader className="pb-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as DebugType)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analyze" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">Analyze</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Logs</span>
            </TabsTrigger>
            <TabsTrigger value="stacktrace" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Stack</span>
            </TabsTrigger>
            <TabsTrigger value="review" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Review</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Icon className="h-5 w-5" />
          <CardTitle className="text-lg">{currentConfig.title}</CardTitle>
        </div>
        <CardDescription>{currentConfig.description}</CardDescription>

        {(activeTab === "analyze" || activeTab === "review") && (
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select language" />
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

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={currentConfig.placeholder}
          className="min-h-[300px] font-mono text-sm code-block resize-y"
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {content.length} characters
          </span>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Icon className="h-4 w-4" />
                {activeTab === "analyze" ? "Analyze Code" : 
                 activeTab === "logs" ? "Parse Logs" :
                 activeTab === "stacktrace" ? "Explain Error" : "Review Code"}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
