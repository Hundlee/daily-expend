"use server";

import { db } from "@/app/_lib/prisma";

const getTags = async () => {
    const tags = await db.tag.findMany();

    return tags;
};

export default getTags;
