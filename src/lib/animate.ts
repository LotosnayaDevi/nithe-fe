/** Staggered reveal animations via IntersectionObserver */
export function initRevealAnimations(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const el = entry.target as HTMLElement;

        if (el.hasAttribute("data-reveal-stagger")) {
          const children = el.querySelectorAll("[data-reveal]");
          const delayMs = parseFloat(
            getComputedStyle(document.documentElement)
              .getPropertyValue("--stagger-delay")
              .replace("ms", ""),
          );
          children.forEach((child, i) => {
            (child as HTMLElement).style.transitionDelay = `${i * delayMs}ms`;
            child.classList.add("revealed");
          });
        } else {
          el.classList.add("revealed");
        }

        observer.unobserve(el);
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll("[data-reveal], [data-reveal-stagger]").forEach((el) => {
    observer.observe(el);
  });
}
