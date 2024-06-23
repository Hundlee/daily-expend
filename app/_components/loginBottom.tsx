"use client";

import { LogInIcon, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const LoginButton = () => {
    const { data: session } = useSession();

    const handleLogin = async () => {
        await signIn("google");
    };

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <div>
            {session ? (
                <Button variant="ghost" className="p-0" onClick={handleLogout}>
                    <LogOutIcon className="lg:w-8 lg:h-8" />
                </Button>
            ) : (
                <Button variant="ghost" className="p-0" onClick={handleLogin}>
                    <LogInIcon className="lg:w-8 lg:h-8" />
                </Button>
            )}
        </div>
    );
};

export default LoginButton;
