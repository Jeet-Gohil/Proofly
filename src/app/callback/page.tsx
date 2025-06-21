// app/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ correct for App Router
import { useSession } from "next-auth/react";
import LoadingOverlay from "../components/RouteLoader";

export default function AuthCallbackPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
        console.log(session?.user?.uuid);
      const uuid = session?.user?.uuid;
      if (uuid) {
        router.replace(`/dashboard/${uuid}`);
      }
    }
  }, [status, session, router]);

  return <LoadingOverlay/>
}
