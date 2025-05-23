// types/next-auth.d.ts



declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string;     // 👈 Add this line
      uuid?: string;   // 👈 If you're using uuid specifically
    };
  }

  interface User {
    id: string;        // For use in callbacks (e.g., jwt)
    uuid?: string;     // Optional if different from `id`
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    uuid?: string;
  }
}
