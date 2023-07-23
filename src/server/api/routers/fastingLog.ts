import { z } from "zod";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

dayjs.extend(duration);

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
  getOneWeek: protectedProcedure.query(async ({ ctx }) => {
    const fastingLogs = await prisma.fastingLog.findMany({
      where: {
        userId: ctx.session.user.id,
        startAt: {
          lte: dayjs().endOf("day").toDate(),
          gte: dayjs().subtract(7, "day").startOf("day").toDate(),
        },
      },
      orderBy: {
        startAt: "desc",
      },
    });
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = dayjs().subtract(i, "day").startOf("day");
      const dayLogs = fastingLogs.filter(({ startAt }) =>
        dayjs(startAt).isSame(day, "day")
      );
      if (dayLogs.length > 0) {
        dayLogs.sort(
          (a, b) =>
            dayjs.duration(dayjs(b.endAt).diff(b.startAt)).asSeconds() -
            dayjs.duration(dayjs(a.endAt).diff(a.startAt)).asSeconds()
        );
        days.push({
          date: day.toString(),
          log: dayLogs[0],
        });
      } else {
        days.push({
          date: day.toString(),
          log: undefined,
        });
      }
    }
    return days;
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
