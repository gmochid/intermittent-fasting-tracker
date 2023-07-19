import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const fastingLogRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const fastingLogs = await prisma.fastingLog.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        startAt: "desc",
      },
    });
    return fastingLogs;
  }),
  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const fastingLogs = await prisma.fastingLog.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        startAt: "desc",
      },
    });
    return fastingLogs;
  }),
  startFasting: protectedProcedure
    .input(
      z.object({
        startAt: z.date(),
      })
    )
    .mutation(async ({ input: { startAt }, ctx }) => {
      const fastingLog = await prisma.fastingLog.create({
        data: {
          userId: ctx.session.user.id,
          startAt,
        },
      });
      return fastingLog;
    }),
  finishFasting: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        endAt: z.date(),
      })
    )
    .mutation(async ({ input: { id, endAt } }) => {
      const fastingLog = await prisma.fastingLog.update({
        data: {
          endAt,
        },
        where: {
          id,
        },
      });
      return fastingLog;
    }),
  cancelFasting: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input: { id } }) => {
      const fastingLog = await prisma.fastingLog.delete({ where: { id } });
      return fastingLog;
    }),
});
