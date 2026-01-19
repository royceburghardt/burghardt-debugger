import { Moon, Sun, Bug, Sparkles, Heart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export const DebuggerHeader = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-gradient-to-r from-violet-500/5 via-fuchsia-500/5 to-cyan-500/5 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-600 to-indigo-600 shadow-lg shadow-fuchsia-500/30 group-hover:shadow-fuchsia-500/50 group-hover:scale-105 transition-all duration-300">
            <Bug className="h-6 w-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 animate-pulse ring-2 ring-background flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">AI</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight flex items-center gap-2">
              <span className="bg-gradient-to-r from-fuchsia-500 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Burghardt
              </span>
              <span className="text-foreground">Debugger</span>
              <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              by <span className="font-semibold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Royce Burghardt</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-500/20 via-violet-500/20 to-indigo-500/20 border border-fuchsia-500/30 text-fuchsia-600 dark:text-fuchsia-400 text-xs font-medium">
            <Heart className="h-3 w-3 text-rose-500 animate-pulse" />
            Built with passion
          </div>
          
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 animate-pulse" />
            AI Online
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-200"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-violet-600" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
