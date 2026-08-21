import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isMemberRole, type Profile } from "@/lib/member";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function getSessionUser() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, avatar_url, show_on_homepage")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data || !isMemberRole(data.role)) return null;

  return {
    id: data.id,
    full_name: data.full_name,
    email: typeof data.email === "string" ? data.email : "",
    role: data.role,
    avatar_url: typeof data.avatar_url === "string" ? data.avatar_url : "",
    show_on_homepage: Boolean(data.show_on_homepage),
  };
}
