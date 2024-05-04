import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import SpentItem from "./_components/spentItem";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function Home() {
    const session = await getServerSession(authOptions);

    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const spent = session?.user
        ? await db.spent.findMany({
              where: {
                  userId: (session.user as any).id,
                  date: {
                      gte: firstDayOfMonth,
                      lte: lastDayOfMonth,
                  },
              },
          })
        : [];

    const totalTodaySpending = spent.reduce((total, item) => {
        const itemDate = new Date(item.date);
        if (itemDate.toDateString() === currentDate.toDateString()) {
            return total + parseFloat(item.price.toFixed(2));
        }
        return total;
    }, 0);

    const totalMonthlySpending = spent.reduce((total, item) => {
        return total + parseFloat(item.price.toFixed(2));
    }, 0);

    const spentFilter = spent.filter((spent) => {
        return spent.date.toDateString() === currentDate.toDateString();
    });

    spentFilter.sort((a, b) => {
        return Number(b.date) - Number(a.date);
    });

    return (
        <div>
            <Header name={"Gastos"} />
            <div className="px-5 pt-5">
                <h2 className="text-xl font-bold">
                    {session?.user
                        ? `Olá, ${session.user.name?.split(" ")[0]}!`
                        : `Olá, Faça seu login!`}
                </h2>
                <p className="text-lg">Qual foi seu gasto hoje?</p>
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
                        - R$ {totalMonthlySpending.toFixed(2)}
                    </h1>
                </div>
            </div>

            <div className="p-5 w-full flex items-center justify-between mt-5">
                <h2 className="text-lg font-semibold">Hoje</h2>
                <h2 className="text-lg font-semibold text-destructive">
                    - R$ {totalTodaySpending.toFixed(2)}
                </h2>
            </div>

            <div className="flex flex-col gap-3 p-5">
                {spentFilter.map((spent) => (
                    <SpentItem key={spent.id} spent={spent} />
                ))}
            </div>
        </div>
    );
}
