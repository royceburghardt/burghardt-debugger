import { Moon, Sun, Bug, Terminal } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export const DebuggerHeader = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 terminal-glow">
            <Bug className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight">Burghardt Debugger</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Terminal className="h-3 w-3" />
              AI-Powered Code Analysis
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
};
