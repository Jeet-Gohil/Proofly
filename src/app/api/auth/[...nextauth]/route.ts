import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import pool from "@/app/lib/db";
// Import types only for type-checking, don't export them from route.ts
import type { NextAuthOptions, User } from "next-auth";

interface ExtendedUser extends User {
  id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const { rows } = await pool.query(
          `SELECT * FROM users WHERE email = $1 LIMIT 1`,
          [email]
        );

        const user = rows[0];
        if (!user || !user.password) throw new Error("User not found");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY as string,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile?.email) {
        try {
          const data = await pool.query('SELECT * FROM users WHERE email = $1', [profile.email]);
          if (data.rows.length > 0) {
            token.id = data.rows[0].id;
          }
        } catch (err) {
          console.error("JWT callback error:", err);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existing = await pool.query(
          `SELECT * FROM users WHERE email = $1`,
          [user.email]
        );
        if (!existing.rows.length) {
          await pool.query(
            `INSERT INTO users (name, email, image, provider) VALUES ($1, $2, $3, $4)`,
            [user.name, user.email, user.image, "google"]
          );
        }
      }
      return true;
    },

    async redirect() {
      return `http://localhost:3000/redirecting`;
    },
  },

  secret: process.env.NEXTAUTH_SECRET || 'secret',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
