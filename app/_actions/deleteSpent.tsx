"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

type DeleteSpentParams = {
    spentId: string;
};

export const deleteSpent = async (spentId: DeleteSpentParams) => {
    await db.spent.delete({
        where: {
            id: spentId.spentId,
        },
    });

    revalidatePath("/");
};
