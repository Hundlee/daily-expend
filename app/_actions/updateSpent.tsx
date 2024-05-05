"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateSpentParams {
    price: number;
    tagNames: string[];
    userId: string;
    name: string;
    spentId: string;
}

export const updateSpent = async (params: UpdateSpentParams) => {
    const { price, tagNames, userId, name, spentId } = params;

    const tags = await db.tag.findMany({
        where: { name: { in: tagNames } },
    });

    await db.spent.update({
        where: {
            id: spentId,
        },
        data: {
            price,
            tags: { connect: tags.map((tag) => ({ id: tag.id })) },
            userId,
            name,
        },
    });

    revalidatePath("/");
};
