import { BarChart4Icon, MegaphoneIcon, Plus } from "lucide-react";
import { Button } from "./ui/button";

const Navigation = () => {
    return (
        <div className="p-5 flex items-center justify-between border-t border-border    ">
            <div className="flex flex-col items-center cursor-pointer">
                <BarChart4Icon />
                <p>Revisão</p>
            </div>
            <Button className="rounded-full p-2">
                <Plus />
            </Button>
            <div className="flex flex-col items-center cursor-pointer">
                <MegaphoneIcon />
                <p>Alterações</p>
            </div>
        </div>
    );
};

export default Navigation;
