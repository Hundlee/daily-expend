"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface SaveSpentParams {
    price: number;
    tagNames: string[];
    userId: string;
    date: Date;
    name: string;
}

export const saveSpent = async (params: SaveSpentParams) => {
    const { price, tagNames, userId, date, name } = params;

    const tags = await db.tag.findMany({
        where: { name: { in: tagNames } },
    });

    await db.spent.create({
        data: {
            price,
            tags: { connect: tags.map((tag) => ({ id: tag.id })) },
            userId,
            date,
            name,
        },
    });

    revalidatePath("/");
};
