// Global client-side entry point — loads on every page
import { initRevealAnimations } from "./lib/animate";

function initNavToggle(): void {
  const toggle = document.getElementById("nav-toggle");
  const mobile = document.getElementById("nav-mobile");
  toggle?.addEventListener("click", () => {
    mobile?.classList.toggle("hidden");
  });
}

function initSearchOverlay(): void {
  const overlay = document.getElementById("search-overlay");
  const input = document.getElementById("search-input") as HTMLInputElement | null;

  document.querySelectorAll("[data-search-toggle]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      overlay?.classList.remove("hidden");
      input?.focus();
    });
  });

  document.querySelectorAll("[data-search-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      overlay?.classList.add("hidden");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay && !overlay.classList.contains("hidden")) {
      overlay.classList.add("hidden");
    }
  });
}

function initQtySteppers(): void {
  document.querySelectorAll("[data-qty-decrease]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = btn.closest(".inline-flex");
      const display = container?.querySelector("[data-qty-value]");
      if (display) {
        const current = parseInt(display.textContent || "1", 10);
        if (current > 1) display.textContent = String(current - 1);
      }
    });
  });

  document.querySelectorAll("[data-qty-increase]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = btn.closest(".inline-flex");
      const display = container?.querySelector("[data-qty-value]");
      if (display) {
        const current = parseInt(display.textContent || "1", 10);
        display.textContent = String(current + 1);
      }
    });
  });
}

function initSizeSelectors(): void {
  document.querySelectorAll("[data-size]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = btn.closest(".flex.flex-wrap");
      if (!container) return;
      // Deselect all siblings
      container.querySelectorAll("[data-size]").forEach((sibling) => {
        (sibling as HTMLElement).style.backgroundColor = "transparent";
        (sibling as HTMLElement).style.color = "var(--color-text-primary)";
        (sibling as HTMLElement).style.border = "1px solid var(--color-border-light)";
      });
      // Select clicked
      (btn as HTMLElement).style.backgroundColor = "var(--color-bg-dark)";
      (btn as HTMLElement).style.color = "var(--color-text-inverse)";
      (btn as HTMLElement).style.border = "1px solid var(--color-bg-dark)";
    });
  });
}

function initCarousels(): void {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const dots = carousel.querySelectorAll("[data-carousel-dot]");
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    let activeIndex = 0;
    const count = dots.length;

    function updateDots() {
      dots.forEach((dot, i) => {
        (dot as HTMLElement).style.backgroundColor =
          i === activeIndex ? "var(--color-text-primary)" : "var(--color-border-light)";
      });
    }

    prevBtn?.addEventListener("click", () => {
      activeIndex = (activeIndex - 1 + count) % count;
      updateDots();
    });

    nextBtn?.addEventListener("click", () => {
      activeIndex = (activeIndex + 1) % count;
      updateDots();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        activeIndex = i;
        updateDots();
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimations();
  initNavToggle();
  initSearchOverlay();
  initQtySteppers();
  initSizeSelectors();
  initCarousels();
});
