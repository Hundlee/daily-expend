"use client";

import { ArrowDown, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import SelectTag from "../_controllers/selectTag";
import ConfirmSpent from "../_controllers/confirmSpent";

const ButtomCreateSpent = () => {
    const [value, setValue] = useState<number>(0);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectTag = (tag: string) => {
        setSelectedTag(tag);
    };

    const dialogOpen = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className="p-2 rounded-full">
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <div className="flex flex-col items-center gap-8">
                        <p className="text-md font-semibold text-gray-800 dark:text-gray-500 capitalize">
                            {format(
                                new Date(),
                                "'Hoje' HH:mm 'dia' d MMM',' yyyy ",
                                {
                                    locale: ptBR,
                                }
                            )}
                        </p>
                        <div className="flex flex-col items-center">
                            <input
                                type="number"
                                className="bg-transparent text-center text-5xl font-bold text-gray-800 dark:text-gray-500 p-0 w-full "
                                placeholder="R$ 0"
                                onChange={(e) =>
                                    setValue(Number(e.target.value))
                                }
                            />
                            <div className="mt-3">
                                <ArrowDown
                                    width={30}
                                    height={30}
                                    className="text-gray-500"
                                />
                            </div>
                        </div>
                        <SelectTag onSelectTag={handleSelectTag} />
                        <div className="flex gap-5">
                            <DialogClose asChild>
                                <Button
                                    variant="destructive"
                                    className="p-6 text-lg"
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>

                            <ConfirmSpent
                                value={value}
                                tag={selectedTag}
                                onClose={dialogOpen}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ButtomCreateSpent;
