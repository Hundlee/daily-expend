"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Spent } from "@prisma/client";
import { format } from "date-fns";
import { SpentDelete } from "./spentDeleteComponent";

interface SpentItemProps {
    spent: Spent;
}
const SpentItem = ({ spent }: SpentItemProps) => {
    return (
        <Card className="min-w-full last:mb-24">
            <CardContent className="py-0 flex px-0 items-center justify-between">
                <div className="flex flex-col gap-2 py-5 pl-3 w-32">
                    <h2 className="font-bold">{spent.name}</h2>
                    <p className="text-sm">
                        {format(spent.date, "'Hoje' H:mm aa")}
                    </p>
                </div>
                <SpentDelete spentId={spent} />
                <div className="flex flex-col items-center justify-center pr-3 w-32">
                    <p className="text-destructive font-semibold">
                        - R$ {parseFloat(spent.price.valueOf()).toFixed(2)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default SpentItem;
