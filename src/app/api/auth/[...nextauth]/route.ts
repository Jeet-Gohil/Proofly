// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/AuthOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // ✅ DO NOT export authOptions here
