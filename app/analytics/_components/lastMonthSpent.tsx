import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";
import { getServerSession } from "next-auth";
import SpentItemAnalytics from "./spentItemAnalytics";

export default async function LastMonthSpent() {
    const session = await getServerSession(authOptions);

    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate.getDate() - 1);
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

    const spentLastMonthFilter = spent.filter((spent) => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
        return spent.date >= oneMonthAgo;
    });

    spentLastMonthFilter.sort((a, b) => {
        return Number(b.price) - Number(a.price);
    });

    const topThreeSpentLastMonth = spentLastMonthFilter.slice(0, 3);

    return (
        <section className="pb-28 p-5 lg:px-16">
            <h1 className="text-white">Maiores gastos do ultimo mês</h1>

            <div className="flex flex-col gap-3 pt-5">
                {topThreeSpentLastMonth.map((spent) => (
                    <SpentItemAnalytics key={spent.id} spent={spent} />
                ))}
            </div>
        </section>
    );
}
