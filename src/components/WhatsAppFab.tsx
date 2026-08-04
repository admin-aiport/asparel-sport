import Link from "next/link";
import { site } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <Link
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="pulse-whatsapp fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-2xl transition active:scale-90 md:bottom-8 md:right-8"
      aria-label="WhatsApp ile yazın"
    >
      <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24" aria-hidden>
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.522-2.961-2.638-.087-.117-.708-.941-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.006.332.013c.105.007.25.043.391.379.144.346.491 1.198.533 1.285.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.101-.177.211-.077.382.099.172.443.731.95 1.183.654.582 1.203.763 1.375.849.172.086.273.072.375-.043s.433-.505.548-.678c.115-.173.231-.144.39-.087.158.058 1.011.477 1.184.563s.289.13.332.202c.045.072.045.419-.1.824z" />
      </svg>
    </Link>
  );
}
