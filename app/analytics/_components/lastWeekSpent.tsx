import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";
import { getServerSession } from "next-auth";
import SpentItemAnalytics from "./spentItemAnalytics";

export default async function LastWeekSpent() {
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

    const spentLastWeekFilter = spent.filter((spent) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return spent.date >= oneWeekAgo;
    });

    spentLastWeekFilter.sort((a, b) => {
        return Number(b.price) - Number(a.price);
    });

    const topThreeSpentLastWeek = spentLastWeekFilter.slice(0, 3);


    return (
        <section className="p-5">
            <h1 className="text-white">Maiores gastos da ultima semana</h1>

            <div className="flex flex-col gap-3 pt-5">
                {topThreeSpentLastWeek.map((spent) => (
                    <SpentItemAnalytics key={spent.id} spent={spent} />
                ))}
            </div>
        </section>
    );
}
