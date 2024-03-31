import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowDown, RefreshCcwIcon, TagIcon } from "lucide-react";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";

const CreateSpent = () => {
    return (
        <>
            <div className="flex flex-col items-center gap-8">
                <p className="text-md font-semibold text-gray-800 dark:text-gray-500 capitalize">
                    {format(new Date(), "'Hoje' HH:mm 'dia' d MMM',' yyyy ", {
                        locale: ptBR,
                    })}
                </p>
                <div className="flex flex-col items-center">
                    <input
                        type="number"
                        className="bg-transparent text-center text-5xl font-bold text-gray-800 dark:text-gray-500 p-0 w-full "
                        placeholder="R$ 0"
                    />
                    <div className="mt-3">
                        <ArrowDown
                            width={30}
                            height={30}
                            className="text-gray-500"
                        />
                    </div>
                </div>
                <div className="flex gap-3 items-center justify-center">
                    <TagIcon className="text-gray-500" />
                    <p>Selecione uma etiqueta</p>
                    <RefreshCcwIcon className="text-gray-500" />
                </div>
                <div className="flex gap-5">
                    <DialogClose asChild>
                        <Button variant="destructive" className="p-6 text-lg">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button className="p-6 text-lg">Proximo</Button>
                </div>
            </div>
        </>
    );
};

export default CreateSpent;
