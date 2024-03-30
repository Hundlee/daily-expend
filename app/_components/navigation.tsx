import { BarChart4Icon, HomeIcon, MegaphoneIcon, Plus } from "lucide-react";
import Link from "next/link";
import ButtomCreateSpent from "./bottomCreateSpent";

const Navigation = () => {
    return (
        <div className="p-5 flex items-center justify-between border-t border-border    ">
            <div>
                <Link href="/analytics" className="flex flex-col items-center">
                    <BarChart4Icon />
                    <p>Revisão</p>
                </Link>
            </div>
            <ButtomCreateSpent />
            <Link
                href="/"
                className="flex flex-col items-center cursor-pointer"
            >
                <HomeIcon />
                <p>Gastos</p>
            </Link>
        </div>
    );
};

export default Navigation;
