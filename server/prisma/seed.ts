import { PrismaClient } from "@prisma/client";

//make connection to the database
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatarUrl: "https://github.com/nmferraz.png",
    },
  });

  const poll = await prisma.poll.create({
    data: {
      title: "Example poll",
      code: "BET123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2023-04-01T11:00:27.736Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "PT",
    },
  });

  await prisma.game.create({
    data: {
      date: "2023-04-03T12:00:00.736Z",
      firstTeamCountryCode: "PT",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
