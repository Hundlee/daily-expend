import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import SpentItem from "./_components/spentItem";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { fetchSpentData } from "../_helpers/fetchSpentData";
import { calculateTotals } from "../_helpers/calculateTotals";
import { filterSpent } from "../_helpers/filterSpent";
import { Spent } from "@prisma/client";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const currentDate = new Date();

    const spent = await fetchSpentData(session, currentDate);
    const { totalToday, totalWeek, totalMonth } = calculateTotals(
        spent,
        currentDate
    );

    const spentToday = filterSpent(spent, currentDate, "today");
    const spentLastWeek = filterSpent(spent, currentDate, "lastWeek");

    spentToday.sort((a: any, b: any) => Number(b.date) - Number(a.date));
    spentLastWeek.sort((a: any, b: any) => Number(b.price) - Number(a.price));

    return (
        <div>
            <Header name={"Gastos"} />
            <div className="px-5 pt-5 lg:px-16">
                <h2 className="text-xl font-bold lg:text-2xl">
                    {session?.user
                        ? `Olá, ${session.user.name?.split(" ")[0]}!`
                        : `Olá, Faça seu login!`}
                </h2>
                <p className="text-lg lg:text-xl">Qual foi seu gasto hoje?</p>
                <p className="capitalize text-sm">
                    {format(new Date(), "EEEE',' d 'de' MMMM", {
                        locale: ptBR,
                    })}
                </p>
            </div>

            <div className="mt-10">
                <div className="flex flex-col items-center justify-center p-5">
                    <p className="text-lg font-semibold">
                        Total de gastos deste mês
                    </p>
                    <h1 className="text-5xl font-semibold text-destructive mt-3">
                        - R$ {totalMonth.toFixed(2)}
                    </h1>
                </div>
            </div>
            <div className="flex justify-between lg:px-16">
                <div className="hidden lg:block w-full">
                    <div className="p-5 w-full flex items-center justify-between mt-5">
                        <h2 className="text-lg font-semibold">Ultima Semana</h2>
                        <h2 className="text-lg font-semibold text-destructive">
                            - R$ {totalWeek.toFixed(2)}
                        </h2>
                    </div>
                    <div className="flex flex-col gap-3 p-5 ">
                        {spentLastWeek.map((spent: Spent) => (
                            <SpentItem key={spent.id} spent={spent} />
                        ))}
                    </div>
                </div>
                {totalToday >= 1 && (
                    <div className="w-full">
                        <div className="p-5 w-full flex items-center justify-between mt-5">
                            <h2 className="text-lg font-semibold">Hoje</h2>
                            <h2 className="text-lg font-semibold text-destructive">
                                - R$ {totalToday.toFixed(2)}
                            </h2>
                        </div>
                        <div className="flex flex-col gap-3 p-5 ">
                            {spentToday.map((spent: Spent) => (
                                <SpentItem key={spent.id} spent={spent} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
