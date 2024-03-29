"use client";

import { LogInIcon } from "lucide-react";
import { Button } from "./ui/button";
import ThemeToggle from "./themeToggle";

const Header = () => {
    return (
        <header className="flex items-center justify-between p-5">
            <ThemeToggle />
            <h1 className="text-2xl font-bold">Gastos</h1>
            <Button className="p-0" variant="ghost">
                <LogInIcon />
            </Button>
        </header>
    );
};

export default Header;
