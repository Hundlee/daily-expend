import { endOfMonth, startOfMonth } from "date-fns";
import { db } from "../_lib/prisma";

export async function fetchSpentData(session: any, currentDate: any) {
    if (!session?.user) return [];

    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    return await db.spent.findMany({
        where: {
            userId: session.user.id,
            date: {
                gte: firstDayOfMonth,
                lte: lastDayOfMonth,
            },
        },
    });
}
