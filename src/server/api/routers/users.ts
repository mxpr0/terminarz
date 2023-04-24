import { type User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        username: z.string().min(2).max(50),
        password: z.string().min(2).max(50),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { username, password } = input;

      const exists = await ctx.prisma.user.findUnique({
        where: { username },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Użytkownik z podaną nazwą już istnieje",
        });
      }

      const hashedPassword = await hash(password);

      const user = filterUser(
        await ctx.prisma.user.create({
          data: {
            username,
            passwordHash: hashedPassword,
          },
        })
      );

      return {
        status: 201,
        message: "Account created successfully",
        user,
      };
    }),
});

function filterUser(user: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...userData } = user;
  return { ...userData };
}
