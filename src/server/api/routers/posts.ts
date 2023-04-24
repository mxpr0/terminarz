import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  createPost: privateProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        category: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { category, content, endDate, startDate } = input;
      return ctx.prisma.post.create({
        data: {
          content,
          endDate,
          startDate,
          user: { connect: { id: ctx.user.id } },
          category: { connect: { name: category } },
        },
      });
    }),
  getPostsByUsername: privateProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const { username } = input;
      return await ctx.prisma.post.findMany({
        where: { user: { username } },
        include: { category: true },
      });
    }),
  getCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany();
  }),
  createCategory: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name } = input;
      const categoryExist = await ctx.prisma.category.findUnique({
        where: { name },
      });
      if (categoryExist) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Taka kategoria już istnieje",
        });
      }
      return ctx.prisma.category.create({
        data: {
          name,
        },
      });
    }),
});
