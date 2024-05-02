"use client";

import { useTheme } from "next-themes";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(theme);

    const handleToggleTheme = () => {
        const newTheme = currentTheme === "light" ? "dark" : "light";
        setTheme(newTheme);
        setCurrentTheme(newTheme);
        toast({
            title: "Theme Updated",
            description: `Your theme has been changed.`,
        });
    };

    return (
        <form onSubmit={handleToggleTheme} name="theme">
            {theme === "light" ? (
                <Button value="dark" type="submit" variant="link">
                    <MoonIcon />
                </Button>
            ) : (
                <Button value="light" type="submit" variant="link">
                    <SunIcon />
                </Button>
            )}
        </form>
    );
}
