// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      uuid?: string; // 👈 Add this
    };
  }

  interface User {
    uuid?: string;
  }

  interface JWT {
    uuid?: string;
  }
}
