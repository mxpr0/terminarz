/* eslint-disable @typescript-eslint/no-empty-interface */
import NextAuth from "next-auth";

interface User {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

interface WithUser {
  user: User;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends WithUser {}
}
