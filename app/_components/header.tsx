import { Ghost, LogInIcon, LogOut, MoonIcon } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
    return (
        <header className="flex items-center justify-between p-5">
            <Button variant="ghost" className="p-0">
                <MoonIcon />
            </Button>
            <h1 className="text-2xl font-bold">Gastos</h1>
            <Button className="p-0" variant="ghost">
                <LogInIcon />
            </Button>
        </header>
    );
};

export default Header;
