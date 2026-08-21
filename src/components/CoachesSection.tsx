import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { getBranchBySlug } from "@/data/branches";
import type { HomepageCoach } from "@/lib/member";

export function CoachesSection({ coaches }: { coaches: HomepageCoach[] }) {
  if (coaches.length === 0) return null;

  return (
    <section
      id="antrenorler"
      className="reveal scroll-mt-[calc(4.25rem+env(safe-area-inset-top,0px)+0.5rem)] border-t border-outline-variant/30 py-12 md:py-16"
    >
      <div className="page-shell">
        <SectionHeading
          eyebrow="Kadro"
          title="Antrenörlerimiz"
          description="Lisanslı eğitmenlerimiz; branş ve belge seviyeleriyle yanınızda."
        />
        <ul className="mt-2 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {coaches.map((coach) => (
            <li key={coach.id} className="flex flex-col items-center text-center">
              <div className="relative h-28 w-28 overflow-hidden rounded-full border border-outline-variant/40 bg-surface-low shadow-sm md:h-32 md:w-32">
                {coach.avatar_url ? (
                  <Image
                    src={coach.avatar_url}
                    alt={coach.full_name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-2xl font-bold text-arel">
                    {coach.full_name.slice(0, 1)}
                  </div>
                )}
              </div>
              <p className="mt-4 font-display text-base font-bold text-navy md:text-lg">{coach.full_name}</p>
              {coach.credentials.length > 0 ? (
                <ul className="mt-2 space-y-1">
                  {coach.credentials.map((cred) => (
                    <li key={`${cred.branch}-${cred.level}`} className="text-sm text-muted">
                      <span className="font-medium text-navy">
                        {getBranchBySlug(cred.branch)?.name ?? cred.branch}
                      </span>
                      {" · "}
                      {cred.level}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-muted">Antrenör</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
