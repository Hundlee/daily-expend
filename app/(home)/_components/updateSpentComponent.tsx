"use client";

import { ArrowDown, RefreshCcwIcon, RotateCcw, TagIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "../../_components/ui/dialog";
import { useEffect, useState } from "react";

import { Spent } from "@prisma/client";
import { updateSpent } from "../../_actions/updateSpent";
import { useSession } from "next-auth/react";
import { toast } from "../../_components/ui/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import getTags from "@/app/_actions/get-tags";

type UpdateSpentComponentProps = {
    spent: Spent;
};

interface TagListProps {
    id: string;
    name: string;
    userId: string | null;
}

const UpdateSpentComponent = ({ spent }: UpdateSpentComponentProps) => {
    const { data } = useSession();

    const [value, setValue] = useState<number>(0);
    const [selectedTag, setSelectedTag] = useState<string | null>(spent.name);
    const [sheetOpen, setSheetOpen] = useState<boolean>(false);
    const [tags, setTags] = useState<TagListProps[]>();
    const [submitIsLoading, setSubmitIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tags = await getTags();

                setTags(tags);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTags();
    }, []);
    const handleSelectTag = (tag: string) => {
        setSelectedTag(tag);
        setSheetOpen(false);
    };

    const handleUpdateSpent = async () => {
        setSubmitIsLoading(true);

        try {
            if (!data?.user) {
                return;
            }

            await updateSpent({
                price: value,
                name: selectedTag || spent.name,
                spentId: spent.id,
                userId: (data?.user as any).id,
                tagNames: [selectedTag || spent.name],
            });

            toast({
                description: "Gasto atualizado com sucesso!",
            });
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitIsLoading(false);
            setIsOpen(false);
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className="p-2 rounded-full" variant="link">
                        <RotateCcw className="text-white w-5 h-5 lg:w-6 lg:h-6" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex flex-col items-center">
                            <input
                                type="number"
                                className="bg-transparent text-center text-5xl font-bold text-gray-800 dark:text-gray-500 p-0 w-full border rounded"
                                placeholder={Number(spent?.price).toFixed(2)}
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
                        <Sheet open={sheetOpen}>
                            <SheetTrigger
                                className="flex gap-3 items-center justify-center"
                                onClick={() => setSheetOpen(!sheetOpen)}
                            >
                                <TagIcon className="text-gray-500" />
                                <p>
                                    {selectedTag
                                        ? selectedTag
                                        : "Selecione uma etiqueta"}
                                </p>
                                <RefreshCcwIcon className="text-gray-500" />
                            </SheetTrigger>
                            <SheetContent side="bottom">
                                <div className="flex flex-col items-center">
                                    <h1>Etiquetas</h1>
                                    <ul className="flex flex-wrap ">
                                        {tags?.map((tag) => (
                                            <li key={tag.id} className="m-2">
                                                <Button
                                                    className="bg-secondary"
                                                    onClick={() =>
                                                        handleSelectTag(
                                                            tag.name
                                                        )
                                                    }
                                                >
                                                    {tag.name}
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </SheetContent>
                        </Sheet>
                        <div className="flex gap-5">
                            <DialogClose asChild>
                                <Button
                                    variant="destructive"
                                    className="p-6 text-lg"
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>

                            <Button
                                variant="default"
                                className="text-lg p-6"
                                onClick={handleUpdateSpent}
                                disabled={submitIsLoading || !value}
                            >
                                Confirmar
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UpdateSpentComponent;
