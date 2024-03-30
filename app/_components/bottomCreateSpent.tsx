"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import CreateSpent from "./_controllers/createSpent";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";

const ButtomCreateSpent = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="p-2 rounded-full">
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <CreateSpent />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ButtomCreateSpent;
