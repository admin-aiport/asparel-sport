"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isMemberRole, type MemberRole } from "@/lib/member";

export const loginRoleCopy: Record<
  MemberRole,
  { title: string; description: string; emailLabel: string }
> = {
  sporcu: {
    title: "Sporcu girişi",
    description: "E-posta ve şifrenizle giriş yapın; antrenman planınızı görün.",
    emailLabel: "Sporcu e-postası",
  },
  antrenor: {
    title: "Antrenör girişi",
    description: "E-posta ve şifrenizle giriş yapın; sporcuların planlarını yönetin.",
    emailLabel: "Antrenör e-postası",
  },
};

export function LoginFields({
  configured,
  role,
  idPrefix = "login",
}: {
  configured: boolean;
  role: MemberRole;
  idPrefix?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const copy = loginRoleCopy[role];
  const emailId = `${idPrefix}-email`;
  const passwordId = `${idPrefix}-password`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;

    setPending(true);
    setError(null);

    try {
      const supabase = createBrowserSupabaseClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError("E-posta veya şifre hatalı.");
        return;
      }

      router.replace("/panel");
      router.refresh();
    } catch {
      setError("Giriş şu an yapılamıyor. Lütfen sonra deneyin.");
    } finally {
      setPending(false);
    }
  }

  return (
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor={emailId} className="mb-2 block text-sm font-semibold text-navy">
            {copy.emailLabel}
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ornek@email.com"
            required
            className="w-full rounded-2xl border border-outline-variant/50 bg-surface-low px-4 py-3 text-base text-navy outline-none transition placeholder:text-muted/70 focus:border-arel focus:bg-white md:text-sm"
          />
        </div>
        <div>
          <label htmlFor={passwordId} className="mb-2 block text-sm font-semibold text-navy">
            Şifre
          </label>
          <input
            id={passwordId}
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded-2xl border border-outline-variant/50 bg-surface-low px-4 py-3 text-base text-navy outline-none transition focus:border-arel focus:bg-white md:text-sm"
          />
        </div>
        {error ? <p className="text-sm font-medium text-error">{error}</p> : null}
        <button
          type="submit"
          disabled={!configured || pending}
          className="cta-lift min-h-11 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Giriş yapılıyor…" : "Panele giriş yap"}
        </button>
      </form>
  );
}

export function LoginForm({ configured }: { configured: boolean }) {
  const searchParams = useSearchParams();
  const requestedRole = searchParams.get("rol") ?? "";
  const initialRole: MemberRole = isMemberRole(requestedRole) ? requestedRole : "sporcu";
  const [role, setRole] = useState<MemberRole>(initialRole);
  const copy = useMemo(() => loginRoleCopy[role], [role]);

  return (
    <div className="rounded-3xl border border-outline-variant/35 bg-white p-4 shadow-[0_20px_50px_rgba(11,29,66,0.06)] sm:p-6 md:p-9">
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Üye türü">
        {(Object.keys(loginRoleCopy) as MemberRole[]).map((tabRole) => {
          const active = role === tabRole;
          return (
            <button
              key={tabRole}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setRole(tabRole)}
              className={`min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-navy text-white shadow-sm"
                  : "border border-outline-variant/50 bg-white text-navy hover:border-arel hover:text-arel"
              }`}
            >
              {tabRole === "sporcu" ? "Sporcu" : "Antrenör"}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <h1 className="font-display text-2xl font-bold text-navy md:text-3xl">{copy.title}</h1>
        <p className="mt-2 text-sm text-muted">{copy.description}</p>
      </div>

      <LoginFields configured={configured} role={role} />
    </div>
  );
}
