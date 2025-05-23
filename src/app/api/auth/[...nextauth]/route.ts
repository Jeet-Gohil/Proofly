import NextAuth from "next-auth/next";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };




// import NextAuth from 'next-auth'

// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
// import pool from '@/app/lib/db'

// export default NextAuth({
//   providers: [
//     // OAuth authentication providers...
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_SECRET as string,
//     }),
//     // Passwordless / email sign in
//     EmailProvider({
//       server: process.env.MAIL_SERVER,
//       from: 'NextAuth.js <no-reply@example.com>'
//     }),
//   ],
//   callbacks: {
//     async session({ session }) {
//       const client = await pool.connect()
//       const result = await client.query(
//         `SELECT id FROM users WHERE email = $1`,
//         [session.user?.email]
//       )
//       client.release()

//       if (result.rows.length > 0) {
//         session.user.id = result.rows[0].id
//       }
//       return session
//     },
//      async signIn({ user, account }) {
//       if (account?.provider === "google") {
//         const existing = await pool.query("SELECT * FROM users WHERE email = $1", [user.email]);
//         if (!existing.rows.length) {
//           await pool.query(
//             "INSERT INTO users (name, email, image, provider) VALUES ($1, $2, $3, $4)",
//             [user.name, user.email, user.image, "google"]
//           );
//         }
//       }
//       return true;
//     },
//     async redirect() {
//       return "http://localhost:3000/redirecting";
//     },
//   },


// })




// // pages/api/auth/[...nextauth].ts

// import NextAuth, { NextAuthOptions } from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
// import { Pool } from 'pg'

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// })

// export const authOptions: NextAuthOption   = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!
//     })
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async signIn({ user, account }) {
//       try {
//         const client = await pool.connect()
//         const result = await client.query(
//           'SELECT * FROM users WHERE email = $1',
//           [user.email]
//         )

//         if (result.rows.length === 0) {
//           await client.query(
//             `INSERT INTO users (name, email, image, provider, provider_account_id)
//              VALUES ($1, $2, $3, $4, $5)`,
//             [user.name, user.email, user.image, account?.provider, account?.providerAccountId]
//           )
//         }

//         client.release()
//         return true
//       } catch (err) {
//         console.error('Error saving user to DB:', err)
//         return false
//       }
//     },

//     async session({ session, token }) {
//       const client = await pool.connect()
//       const result = await client.query(
//         `SELECT id FROM users WHERE email = $1`,
//         [session.user?.email]
//       )
//       client.release()

//       if (result.rows.length > 0) {
//         session.user.id = result.rows[0].id
//       }
//       return session
//     },

//     async redirect({ url, baseUrl }) {
//       return '/dashboard'
//     }
//   }
// }

// export default NextAuth(authOptions)

// // import NextAuth from "next-auth";
// // import { authOptions } from "./authOptions";  // Adjust path if needed

// // const handler = NextAuth(authOptions);

// // export { handler as GET, handler as POST };
