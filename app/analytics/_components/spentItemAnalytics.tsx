"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Spent } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SpentItemProps {
    spent: Spent;
}
const SpentItemAnalytics = ({ spent }: SpentItemProps) => {
    return (
        <Card className="min-w-full">
            <CardContent className="py-0 flex px-0 items-center justify-between">
                <div className="flex flex-col gap-2 py-5 pl-3">
                    <h2 className="font-bold">{spent.name}</h2>
                    <p className="text-sm capitalize">
                        {format(spent.date, "'dia' d 'de' MMM H:mm aa", {
                            locale: ptBR,
                        })}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center pr-3">
                    <p className="text-destructive font-semibold">
                        - R$ {parseFloat(spent.price.valueOf()).toFixed(2)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default SpentItemAnalytics;
