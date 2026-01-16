import { Moon, Sun, Bug, Sparkles } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export const DebuggerHeader = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 glass">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl gradient-primary shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Bug className="h-6 w-6 text-primary-foreground" />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight flex items-center gap-2">
              Burghardt Debugger
              <Sparkles className="h-4 w-4 text-accent" />
            </span>
            <span className="text-xs text-muted-foreground">
              AI-Powered Code Analysis
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            AI Online
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-xl hover:bg-secondary transition-colors duration-200"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-warning" />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
