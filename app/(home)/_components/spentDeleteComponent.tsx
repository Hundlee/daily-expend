"use client";

import { deleteSpent } from "@/app/_actions/deleteSpent";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { toast } from "@/app/_components/ui/use-toast";
import { Spent } from "@prisma/client";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

type SpentDeleteProps = {
    spentId: Spent;
};

export function SpentDelete({ spentId }: SpentDeleteProps) {
    const [submitIsLoading, setSubmitIsLoading] = useState(false);

    const handleDeleteSpent = async () => {
        setSubmitIsLoading(true);

        try {
            await deleteSpent({
                spentId: spentId.id,
            });
            toast({
                description: "Gasto deletado com sucesso!",
            });
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitIsLoading(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost">
                    <Trash2 className="text-white" width={20} height={20} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Você tem certeza absoluta?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso irá deletar
                        permanentemente o gasto e remover os dados dos nossos
                        servidores.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteSpent}>
                        {submitIsLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Confirmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
