"use client";

import { LogInIcon } from "lucide-react";
import { Button } from "./ui/button";
import ThemeToggle from "./themeToggle";

interface HeaderProps {
    name: string;
}

const Header = ({ name }: HeaderProps) => {
    return (
        <header className="flex items-center justify-between p-5">
            <ThemeToggle />
            <h1 className="text-2xl font-bold">{name}</h1>
            <Button className="p-0" variant="ghost">
                <LogInIcon />
            </Button>
        </header>
    );
};

export default Header;
