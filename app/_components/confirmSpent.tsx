"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";
import { saveSpent } from "../_actions/save-spent";
import { signIn, useSession } from "next-auth/react";
import { toast } from "./ui/use-toast";

const ConfirmSpent = ({
    value,
    tag,
    onClose,
}: {
    value: number;
    tag: string | null;
    onClose: () => void;
}) => {
    const { data } = useSession();

    const date = new Date();
    const [submitIsLoading, setSubmitIsLoading] = useState(false);
    const [sheetIsOpen, setSheetIsOpen] = useState(false);

    const handleSubmitSpent = async () => {
        setSubmitIsLoading(true);

        try {
            if (!data?.user) {
                await signIn("google");
                return;
            }

            await saveSpent({
                price: value,
                tagNames: [tag!],
                userId: (data.user as any).id,
                date,
                name: tag!,
            });

            setSheetIsOpen(false);
            onClose();
            toast({
                description: "Gasto adicionado com sucesso!",
            });
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitIsLoading(false);
        }
    };

    return (
        <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
                <Button className="p-6 text-lg" disabled={value < 0.1 || !tag}>
                    Proximo
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetTitle>Confirmação</SheetTitle>
                <SheetDescription>
                    Ajude-nos a garantir a precisão analisando suas despesas
                    antes de confirma-la, porque você não poderá editá-la mais
                    tarde.
                </SheetDescription>

                <div className="flex justify-center items-center gap-5 my-20 w-full">
                    <h1 className="text-3xl font-semibold">R${value}</h1>
                    <ArrowRight width={30} height={30} />
                    <h1 className="text-xl font-semibold">{tag}</h1>
                </div>

                <div className="flex justify-center gap-4">
                    <SheetClose asChild>
                        <Button
                            variant="destructive"
                            className="w-full text-xl h-16"
                        >
                            Cancelar
                        </Button>
                    </SheetClose>
                    <Button
                        variant="default"
                        className="w-full text-xl h-16"
                        onClick={handleSubmitSpent}
                        disabled={submitIsLoading}
                    >
                        {submitIsLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Confirmar
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ConfirmSpent;
