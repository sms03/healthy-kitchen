
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export const DarkModeToggle = ({ isScrolled }: { isScrolled: boolean }) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`rounded-full font-lora transition-all duration-300 border-orange-200 hover:bg-orange-50 dark:border-orange-300 dark:hover:bg-orange-950 ${
        isScrolled ? 'w-10 h-10' : 'w-12 h-12'
      }`}
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ${
        isScrolled ? 'w-4 h-4' : 'w-5 h-5'
      }`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ${
        isScrolled ? 'w-4 h-4' : 'w-5 h-5'
      }`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
