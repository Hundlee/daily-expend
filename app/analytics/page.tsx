import { getServerSession } from "next-auth";
import Header from "../_components/header";
import Grafic from "./_components/grafic";
import { authOptions } from "../_lib/auth";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { db } from "../_lib/prisma";
import LastWeekSpent from "./_components/lastWeekSpent";
import LastMonthSpent from "./_components/lastMonthSpent";

const Analytics = async () => {
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

    return (
        <div>
            <Header name={"Análise"} />
            <Grafic spents={spent} />
            <LastWeekSpent />
            <LastMonthSpent />
        </div>
    );
};

export default Analytics;
