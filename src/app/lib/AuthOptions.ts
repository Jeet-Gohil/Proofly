
// app/lib/authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_API_KEY!,
      clientSecret: process.env.GOOGLE_SECRET_KEY!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          uuid: user.id, // or user.uuid if UUID column exists
        };
      }
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
    async redirect() {
      return 'https://proofly-delta.vercel.app/callback'
    },
    
  },
  pages : {
    signIn : "/login"
  },
  secret: process.env.NEXTAUTH_SECRET,
 
  debug: true,
};
