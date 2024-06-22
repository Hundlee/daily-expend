import { getServerSession } from "next-auth";
import Header from "../_components/header";
import Grafic from "./_components/grafic";
import { authOptions } from "../_lib/auth";
import { endOfMonth, startOfMonth } from "date-fns";
import { db } from "../_lib/prisma";
import LastWeekSpent from "./_components/lastWeekSpent";
import LastMonthSpent from "./_components/lastMonthSpent";
import { fetchSpentData } from "../_helpers/fetchSpentData";

const Analytics = async () => {
    const session = await getServerSession(authOptions);
    const currentDate = new Date();

    const spent = await fetchSpentData(session, currentDate);
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
