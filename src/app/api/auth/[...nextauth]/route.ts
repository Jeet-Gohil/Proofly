import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import bcrypt from "bcrypt";
import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

interface ExtendedUser extends User {
  id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
}



// Define your NextAuth config with full typing
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<ExtendedUser | null> {
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

    // Google Provider with prompt
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
    // Customize JWT token
    async jwt({token, account, profile}) {
      if (account &&  profile?.email) {
        try {
          const data = await pool.query('SELECT * FROM users where email = $1', [profile.email]);
          let userID ;
           if (data.rows.length > 0) {
            userID = data.rows[0].id;
           }
           token.id = userID;
        }
        catch(err) {

        }
      }
      return token;
    }

    // Add user data to session
    ,
    async session ({session, token}) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    }
    ,

    // Handle sign-in logic
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
    async redirect({ baseUrl, url }) {
      return `http://localhost:3000/redirecting`;
    },
  },

  secret: 'secret',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
