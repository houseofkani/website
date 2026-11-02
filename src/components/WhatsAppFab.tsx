import { SITE } from "@/lib/site";

/** Floating WhatsApp enquiry button, present on every page. */
export function WhatsAppFab() {
  const number = SITE.whatsapp.replace(/\D/g, "");

  if (!number) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with House of Kani on WhatsApp"
      className="group fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-30 flex h-14 w-14 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:right-8 sm:bottom-24"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border border-[#25D366] opacity-0 motion-safe:animate-[whatsapp-ring_2.7s_ease-out_infinite]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border border-[#25D366] opacity-0 motion-safe:animate-[whatsapp-ring_2.7s_ease-out_0.9s_infinite]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border border-[#25D366] opacity-0 motion-safe:animate-[whatsapp-ring_2.7s_ease-out_1.8s_infinite]"
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_40px_-12px_rgba(37,211,102,0.65)] transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:bg-[#20BD5A] group-focus-visible:scale-[1.06]">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-6 w-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </span>
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full border border-gold/30 bg-forest px-4 py-2 font-sans text-[0.65rem] tracking-[0.18em] uppercase text-ivory opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 lg:block">
        WhatsApp us
      </span>
    </a>
  );
}
