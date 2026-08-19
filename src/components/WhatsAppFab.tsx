import Link from "next/link";
import { BipIcon, WhatsAppIcon } from "@/components/SocialIcons";
import { site } from "@/lib/site";

const fabClass =
  "flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition active:scale-90";

export function WhatsAppFab() {
  return (
    <div className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom,0px))] right-3 z-40 flex flex-col gap-3 md:bottom-8 md:right-8">
      <Link
        href={site.bipUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`pulse-bip ${fabClass} bg-white p-1.5`}
        aria-label="BiP ile yazın"
      >
        <BipIcon className="h-11 w-11" />
      </Link>
      <Link
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`pulse-whatsapp ${fabClass} bg-white p-1.5`}
        aria-label="WhatsApp ile yazın"
      >
        <WhatsAppIcon className="h-11 w-11" />
      </Link>
    </div>
  );
}
