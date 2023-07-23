import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const profileRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: ctx.session.user.id },
    });
    return user;
  }),
  setProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        targetHours: z.number().optional(),
      })
    )
    .mutation(async ({ input: { name, targetHours }, ctx }) => {
      await prisma.user.update({
        data: {
          name,
          targetHours,
        },
        where: {
          id: ctx.session.user.id,
        },
      });
    }),
});
