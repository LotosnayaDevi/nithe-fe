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
      overlay?.classList.remove("search-overlay-hidden");
      input?.focus();
    });
  });

  document.querySelectorAll("[data-search-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      overlay?.classList.add("search-overlay-hidden");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay && !overlay.classList.contains("search-overlay-hidden")) {
      overlay.classList.add("search-overlay-hidden");
    }
  });
}

function initQtySteppers(): void {
  document.querySelectorAll("[data-qty-decrease]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = btn.closest("[data-qty-stepper]") || btn.closest(".inline-flex");
      const input = container?.querySelector("input.qty") as HTMLInputElement | null;
      const display = container?.querySelector("[data-qty-value]");
      if (input) {
        const current = parseInt(input.value || "1", 10);
        if (current > 1) input.value = String(current - 1);
      } else if (display) {
        const current = parseInt(display.textContent || "1", 10);
        if (current > 1) display.textContent = String(current - 1);
      }
    });
  });

  document.querySelectorAll("[data-qty-increase]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = btn.closest("[data-qty-stepper]") || btn.closest(".inline-flex");
      const input = container?.querySelector("input.qty") as HTMLInputElement | null;
      const display = container?.querySelector("[data-qty-value]");
      if (input) {
        const current = parseInt(input.value || "1", 10);
        input.value = String(current + 1);
      } else if (display) {
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

function initDropdowns(): void {
  const pairs: { toggle: string; dropdown: string }[] = [
    { toggle: "[data-filter-toggle]", dropdown: "[data-filter-dropdown]" },
    { toggle: "[data-sort-toggle]", dropdown: "[data-sort-dropdown]" },
    { toggle: "[data-locale-toggle]", dropdown: "[data-locale-dropdown]" },
  ];

  function closeAll(): void {
    document.querySelectorAll(".dropdown-panel").forEach((panel) => {
      panel.classList.add("dropdown-hidden");
    });
  }

  pairs.forEach(({ toggle, dropdown }) => {
    const toggleEl = document.querySelector(toggle);
    const dropdownEl = document.querySelector(dropdown);
    if (!toggleEl || !dropdownEl) return;

    toggleEl.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = dropdownEl.classList.contains("dropdown-hidden");
      closeAll();
      if (isHidden) {
        dropdownEl.classList.remove("dropdown-hidden");
      }
    });

    // Prevent clicks inside the dropdown from closing it
    dropdownEl.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  // Click outside closes all dropdowns
  document.addEventListener("click", () => {
    closeAll();
  });

  // Escape key closes all dropdowns
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
}

/* ─── AJAX Cart helpers (WooCommerce-ready) ─── */

declare const jQuery: any;

function initAjaxCart(): void {
  if (typeof jQuery === "undefined") return;
  const $ = jQuery;

  function updateCartCount(count: number): void {
    $(".cart-contents-count").text(count);
  }

  // Add to cart
  $(document).on("submit", "form.cart", function (e: Event) {
    e.preventDefault();
    const $form = $(this);
    const productId = $form.find("input[name='add-to-cart']").val();
    const qty = $form.find("input.qty").val() || 1;
    const size = $form.find("input[name='attribute_size']:checked").val() ||
                 $form.find("input[name='attribute_size']").val() || "";

    $.ajax({
      url: "/api/cart/add",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ product_id: productId, quantity: parseInt(qty as string, 10), size }),
      success(res: { cart_count: number }) {
        updateCartCount(res.cart_count);
        $form.find(".single_add_to_cart_button").text("Added!");
        setTimeout(() => {
          $form.find(".single_add_to_cart_button").text("Add to cart");
        }, 1500);
      },
    });
  });

  // Remove from cart
  $(document).on("click", "[data-cart-remove]", function () {
    const key = $(this).data("cart-remove");
    $.ajax({
      url: "/api/cart/remove",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ cart_item_key: key }),
      success(res: { cart_count: number }) {
        updateCartCount(res.cart_count);
        location.reload();
      },
    });
  });

  // Fetch initial cart count
  $.getJSON("/api/cart", function (res: { cart_count: number }) {
    updateCartCount(res.cart_count);
  });
}

function initActiveNav(): void {
  const currentPath = window.location.pathname + window.location.search;
  const navLinks = document.querySelectorAll<HTMLAnchorElement>("a[data-nav]");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const isActive = href === currentPath || href === window.location.pathname;

    // Remove any server-rendered active state
    link.classList.remove("text-white");
    link.style.color = isActive ? "var(--color-text-inverse)" : "var(--color-text-muted)";

    // Remove existing underline images
    const existing = link.querySelector("img");
    if (existing) existing.remove();

    // Add underline to active tab
    if (isActive) {
      link.classList.add("text-white");
      const img = document.createElement("img");
      img.src = "/assets/images/underline.png";
      img.alt = "";
      img.style.cssText = "position: absolute; bottom: -6px; left: -1px; width: calc(100% + 2px); height: auto; pointer-events: none;";
      link.appendChild(img);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimations();
  initNavToggle();
  initSearchOverlay();
  initQtySteppers();
  initSizeSelectors();
  initCarousels();
  initDropdowns();
  initAjaxCart();
  initActiveNav();
});
