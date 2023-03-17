import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export function pollRoutes(fastify: FastifyInstance) {
  fastify.get("/polls/count", async () => {
    const count = await prisma.poll.count();
    return { count };
  });
}
