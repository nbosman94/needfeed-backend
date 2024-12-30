import { PrismaClient } from "@prisma/client";
import { create } from "domain";

const prisma = new PrismaClient();

async function main(){

    console.log("Seeding database...");
    const user = await prisma.user.upsert({
        where: { email: 'testuser@example.com' },  // Unique constraint
        update: {},  // If user exists, no update (or add fields to update)
        create: {
          email: 'testuser@example.com',
          username: 'testuser',
          password: 'securepassword123',
          lists: {
            create: [
              {
                listItems: {
                  create: [
                    { content: 'Apples', quantity: 5 },
                    { content: 'Bananas', quantity: 10 },
                  ],
                },
              },
              {
                listItems: {
                  create: [
                    { content: 'Milk', quantity: 1 },
                    { content: 'Bread', quantity: 2 },
                  ],
                },
              },
            ],
          },
        },
      });

    // const userTwo = await prisma.user.upsert({
    //     where: {email: 'kirkcousins@test.com'},
    //     update: {},
    //     create: {
    //         email: 'kirkcousins@test.com',
    //         username: 'kirkCousinsQB',
    //         password: '12345',
    //         lists: {
    //             create: [
    //                 {listItems:
    //                     {
    //                         create: [
    //                             {content: "Apples", quantity: 5},
    //                             {content: "Rice", quantity:2}
    //                         ]
    //                     }
    //                 }
    //             ]
    //         }
    //     }
    // });

    console.log({user})
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})