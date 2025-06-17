// app/lib/authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "test@example.com" &&
          credentials?.password === "password"
        ) {
          return { id: "1", name: "Test User", email: "test@example.com" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        const result = await pool.query(
          "SELECT id FROM users WHERE email = $1",
          [user.email]
        );
        token.uuid = result.rows?.[0]?.id || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.uuid && session?.user) {
        (session.user as { [key: string]: any }).uuid = token.uuid;
      }
      return session;
    },
    async signIn({ user, account }) {
      try {
        const { email, name, image } = user;
        const provider = account?.provider || "unknown";
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length === 0) {
          await pool.query(
            "INSERT INTO users (email, name, image, provider) VALUES ($1, $2, $3, $4)",
            [email, name, image, provider]
          );
        }

        return true;
      } catch (error) {
        console.error("Sign in failed:", error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  debug: true,
};
