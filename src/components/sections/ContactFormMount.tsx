"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactFormClient = dynamic(() => import("@/components/sections/ContactFormClient"), {
  ssr: false,
  loading: () => <ContactFormPlaceholder />,
});

function ContactFormPlaceholder() {
  return (
    <div className="nlg-form nlg-form-placeholder" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export default function ContactFormMount() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#contact") {
      setShouldLoad(true);
      return;
    }

    const node = mountRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "640px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={mountRef}>
      {shouldLoad ? <ContactFormClient /> : <ContactFormPlaceholder />}
    </div>
  );
}
