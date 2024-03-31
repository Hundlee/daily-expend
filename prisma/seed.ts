const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
    try {
        const tags = [
            { name: "Viagem" },
            { name: "Festa" },
            { name: "Comida" },
            { name: "Produtos de Limpeza" },
            { name: "Produtos de Beleza" },
            { name: "Presentes" },
            { name: "Tv" },
            { name: "Compras" },
            { name: "Outros" },
        ];

        await prisma.tag.createMany({
            data: tags,
        });

        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
    }
}

seedDatabase();
