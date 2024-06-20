import { BarChart4Icon, HomeIcon } from "lucide-react";
import Link from "next/link";
import ButtomCreateSpent from "./bottomCreateSpent";

const Navigation = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 ">
            <div className="p-5 flex items-center justify-between border-t border-border  bg-background lg:px-16">
                <div className="lg:px-5">
                    <Link
                        href="/analytics"
                        className="flex flex-col items-center"
                    >
                        <BarChart4Icon />
                        <p>Revisão</p>
                    </Link>
                </div>
                <ButtomCreateSpent />
                <div className="lg:px-5">
                    <Link
                        href="/"
                        className="flex flex-col items-center cursor-pointer"
                    >
                        <HomeIcon />
                        <p>Gastos</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
