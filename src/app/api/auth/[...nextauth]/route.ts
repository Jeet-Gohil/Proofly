import NextAuth from "next-auth";
import { authOptions } from "./authOptions";  // Adjust path if needed

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
