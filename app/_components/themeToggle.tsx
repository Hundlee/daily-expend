"use client";

import { useTheme } from "next-themes";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const handleToggleTheme = (event: any) => {
        event.preventDefault();
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        toast({
            title: "Theme Updated",
            description: `Your theme has been changed.`,
        });
    };

    return (
        <form onSubmit={handleToggleTheme} name="theme">
            {theme === "light" ? (
                <Button
                    value="dark"
                    type="submit"
                    variant="link"
                    className="text-black"
                >
                    <MoonIcon />
                </Button>
            ) : (
                <Button
                    value="light"
                    type="submit"
                    variant="link"
                    className="text-white"
                >
                    <SunIcon />
                </Button>
            )}
        </form>
    );
}
