
import { Moon, SunDim } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "@/lib/theme-context";

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      aria-label="تبديل الوضع الليلي"
    >
      {theme === "dark" ? (
        <SunDim className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
