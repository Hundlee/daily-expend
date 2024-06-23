import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";
import SpentItemAnalytics from "./spentItemAnalytics";
import { fetchSpentData } from "@/app/_utils/fetchSpentData";
import { filterSpent } from "@/app/_utils/filterSpent";
import { Spent } from "@prisma/client";

export default async function LastWeekSpent() {
    const session = await getServerSession(authOptions);

    const currentDate = new Date();

    const spent = await fetchSpentData(session, currentDate);

    const spentLastWeek = filterSpent(spent, currentDate, "lastWeek");

    spentLastWeek.sort((a: any, b: any) => Number(b.price) - Number(a.price));

    const topThreeSpentLastWeek = spentLastWeek.slice(0, 3);

    return (
        <section className="p-5 lg:px-16">
            <h1 className="text-white">Maiores gastos da ultima semana</h1>

            <div className="flex flex-col gap-3 pt-5">
                {topThreeSpentLastWeek.map((spent: Spent) => (
                    <SpentItemAnalytics key={spent.id} spent={spent} />
                ))}
            </div>
        </section>
    );
}
