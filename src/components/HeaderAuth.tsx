"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function HeaderAuth({
  configured,
  variant = "desktop",
}: {
  configured: boolean;
  variant?: "desktop" | "mobile";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [signedIn, setSignedIn] = useState(false);

  function scrollToMember(hash: "#giris-sporcu" | "#giris-antrenor") {
    if (pathname !== "/") return;
    if (window.location.hash !== hash) {
      history.replaceState(null, "", hash);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    document.getElementById("giris")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    if (!configured) return;

    const supabase = createBrowserSupabaseClient();

    void supabase.auth.getUser().then(({ data }) => {
      setSignedIn(Boolean(data.user));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session?.user));
    });

    return () => subscription.unsubscribe();
  }, [configured]);

  async function handleSignOut() {
    if (!configured) return;
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    setSignedIn(false);
    router.push("/");
    router.refresh();
  }

  if (variant === "mobile") {
    if (signedIn) {
      return (
        <>
          <Link href="/panel" className="rounded-xl px-3 py-3 text-base font-semibold text-navy hover:bg-surface-low">
            Panel
          </Link>
          <button
            type="button"
            onClick={() => void handleSignOut()}
            className="rounded-xl px-3 py-3 text-left text-base font-semibold text-muted hover:bg-surface-low"
          >
            Çıkış
          </button>
        </>
      );
    }

    return (
      <>
        <Link
          href="/#giris-sporcu"
          className="rounded-xl px-3 py-3 text-base font-semibold text-navy hover:bg-surface-low"
          onClick={(event) => {
            if (pathname !== "/") return;
            event.preventDefault();
            scrollToMember("#giris-sporcu");
          }}
        >
          Sporcu
        </Link>
        <Link
          href="/#giris-antrenor"
          className="rounded-xl px-3 py-3 text-base font-semibold text-navy hover:bg-surface-low"
          onClick={(event) => {
            if (pathname !== "/") return;
            event.preventDefault();
            scrollToMember("#giris-antrenor");
          }}
        >
          Antrenör
        </Link>
      </>
    );
  }

  if (signedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/panel"
          className="rounded-full border border-outline-variant/50 px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-arel hover:text-arel"
        >
          Panel
        </Link>
        <button
          type="button"
          onClick={() => void handleSignOut()}
          className="rounded-full px-3 py-2.5 text-sm font-semibold text-muted transition hover:text-navy"
        >
          Çıkış
        </button>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-2 md:flex">
      <Link
        href="/#giris-sporcu"
        className="rounded-full border border-outline-variant/50 px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-arel hover:text-arel"
        onClick={(event) => {
          if (pathname !== "/") return;
          event.preventDefault();
          scrollToMember("#giris-sporcu");
        }}
      >
        Sporcu
      </Link>
      <Link
        href="/#giris-antrenor"
        className="rounded-full border border-outline-variant/50 px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-arel hover:text-arel"
        onClick={(event) => {
          if (pathname !== "/") return;
          event.preventDefault();
          scrollToMember("#giris-antrenor");
        }}
      >
        Antrenör
      </Link>
    </div>
  );
}
