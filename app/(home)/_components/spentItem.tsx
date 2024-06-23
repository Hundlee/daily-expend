"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Spent } from "@prisma/client";
import { format } from "date-fns";
import { SpentDelete } from "./spentDeleteComponent";
import UpdateSpentComponent from "@/app/(home)/_components/updateSpentComponent";
import { ptBR } from "date-fns/locale";

interface SpentItemProps {
    spent: Spent;
}
const SpentItem = ({ spent }: SpentItemProps) => {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() - 1);

    return (
        <Card className="w-full last:mb-24 lg:h-[10rem] lg:flex lg:items-center lg:justify-center ">
            <CardContent className="py-0 flex items-center justify-between lg:w-full">
                <div className="flex flex-col gap-2 py-5 lg:gap-5 w-full">
                    <h2 className="font-bold">{spent.name}</h2>
                    {spent.date >= currentDate ? (
                        <p className="text-sm">
                            {format(spent.date, "'Hoje' H:mm aa")}
                        </p>
                    ) : (
                        <p className="text-sm capitalize">
                            {format(spent.date, "'dia' d 'de' MMM H:mm aa", {
                                locale: ptBR,
                            })}
                        </p>
                    )}
                </div>
                <div className="flex flex-col w-full">
                    <UpdateSpentComponent spent={spent} />
                    <SpentDelete spentId={spent} />
                </div>
                <div className="flex flex-col justify-center w-full place-content-end items-end">
                    <p className="text-destructive font-semibold">
                        - R$ {parseFloat(spent.price.valueOf()).toFixed(2)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default SpentItem;
