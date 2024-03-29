import { LogOut, MoonIcon } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
    return (
        <div className="flex items-center justify-between p-5">
            <Button size="icon" variant="ghost">
                <MoonIcon />
            </Button>
            <h1 className="text-3xl font-bold">Gastos</h1>
            <Button>Login</Button>
        </div>
    );
};

export default Header;
