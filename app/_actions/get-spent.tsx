"use server";

import { db } from "@/app/_lib/prisma";

const getSpents = async () => {
    const spents = await db.spent.findMany();

    return spents;
};

export default getSpents;
