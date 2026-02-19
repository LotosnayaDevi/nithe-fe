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

function formatPrice(n: number): string {
  return "₴" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function recalcCart(): void {
  const rows = document.querySelectorAll("[data-cart-row]");
  const totalEl = document.querySelector("[data-estimated-total]");
  if (!rows.length || !totalEl) return;

  let grandTotal = 0;
  rows.forEach((row) => {
    const unitPrice = parseFloat((row as HTMLElement).dataset.unitPrice || "0");
    const qtyInput = row.querySelector("input.qty") as HTMLInputElement | null;
    const qty = parseInt(qtyInput?.value || "0", 10);
    const rowTotal = unitPrice * qty;
    grandTotal += rowTotal;

    const rowTotalEl = row.querySelector("[data-row-total]");
    if (rowTotalEl) rowTotalEl.textContent = formatPrice(rowTotal);
  });

  totalEl.textContent = formatPrice(grandTotal);

  // If all quantities are 0, reload as empty cart
  const allZero = Array.from(rows).every((row) => {
    const qtyInput = row.querySelector("input.qty") as HTMLInputElement | null;
    return parseInt(qtyInput?.value || "0", 10) === 0;
  });
  if (allZero) {
    localStorage.setItem("nythe_cart_count", "0");
    window.location.href = "/pages/empty-cart";
  }
}

function initQtySteppers(): void {
  document.querySelectorAll("[data-qty-decrease]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = btn.closest("[data-qty-stepper]") || btn.closest(".inline-flex");
      const input = container?.querySelector("input.qty") as HTMLInputElement | null;
      const display = container?.querySelector("[data-qty-value]");
      if (input) {
        const current = parseInt(input.value || "1", 10);
        if (current > 0) input.value = String(current - 1);
      } else if (display) {
        const current = parseInt(display.textContent || "1", 10);
        if (current > 0) display.textContent = String(current - 1);
      }
      recalcCart();
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
      recalcCart();
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

/* ─── Cart badge (vanilla) ─── */

function updateCartBadge(count: number): void {
  const badge = document.querySelector(".cart-contents-count") as HTMLElement | null;
  if (!badge) return;
  if (count > 0) {
    badge.textContent = String(count);
    badge.style.display = "flex";
  } else {
    badge.textContent = "0";
    badge.style.display = "none";
  }
}

function getCartCount(): number {
  const badge = document.querySelector(".cart-contents-count") as HTMLElement | null;
  if (!badge || badge.style.display === "none") return 0;
  return parseInt(badge.textContent || "0", 10);
}

function initCartBadge(): void {
  // On cart page, skip localStorage restore — will sync from actual items below
  const cartRows = document.querySelectorAll("[data-cart-row]");
  if (cartRows.length === 0) {
    // Not on cart page: restore badge from localStorage
    const stored = parseInt(localStorage.getItem("nythe_cart_count") || "0", 10);
    if (stored > 0) updateCartBadge(stored);
  }

  // On product page: intercept form.cart submit to update badge
  const cartForm = document.querySelector("form.cart") as HTMLFormElement | null;
  if (cartForm) {
    cartForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const qtyInput = cartForm.querySelector("input.qty") as HTMLInputElement | null;
      const qty = parseInt(qtyInput?.value || "1", 10);
      const current = getCartCount();
      const newCount = current + qty;
      updateCartBadge(newCount);
      localStorage.setItem("nythe_cart_count", String(newCount));

      // Show "Added!" feedback
      const btn = cartForm.querySelector(".single_add_to_cart_button");
      if (btn) {
        const original = btn.textContent;
        btn.textContent = "Added!";
        setTimeout(() => { btn.textContent = original; }, 1500);
      }
    });
  }

  // On cart page: sync badge to actual cart items and update on qty changes
  if (cartRows.length > 0) {
    // Sync badge to actual qty on page load
    let initialTotal = 0;
    cartRows.forEach((row) => {
      const input = row.querySelector("input.qty") as HTMLInputElement | null;
      initialTotal += parseInt(input?.value || "0", 10);
    });
    updateCartBadge(initialTotal);
    localStorage.setItem("nythe_cart_count", String(initialTotal));

    document.querySelectorAll("[data-qty-decrease], [data-qty-increase]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTimeout(() => {
          let total = 0;
          cartRows.forEach((row) => {
            const input = row.querySelector("input.qty") as HTMLInputElement | null;
            total += parseInt(input?.value || "0", 10);
          });
          updateCartBadge(total);
          localStorage.setItem("nythe_cart_count", String(total));
        }, 0);
      });
    });
  }
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
      img.style.cssText = "position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: calc(100% + 8px); height: auto; pointer-events: none;";
      link.appendChild(img);
    }
  });
}

function initSearchResults(): void {
  const input = document.getElementById("search-input") as HTMLInputElement | null;
  const resultsContainer = document.getElementById("search-results");
  if (!input || !resultsContainer) return;

  // Product catalog for search — in production this would come from WooCommerce
  const products = [
    { name: "BG-01", href: "/pages/product-info" },
    { name: "BG-02", href: "/pages/product-info" },
    { name: "BG-03", href: "/pages/product-info" },
    { name: "BG-04", href: "/pages/product-info" },
    { name: "BG-05", href: "/pages/product-info" },
    { name: "BG-06", href: "/pages/product-info" },
    { name: "JC-09", href: "/pages/product-info" },
    { name: "RT-01", href: "/pages/product-info" },
    { name: "BG-07", href: "/pages/product-info" },
    { name: "BG-08", href: "/pages/product-info" },
  ];

  const innerContainer = document.getElementById("search-results-inner") as HTMLDivElement;

  function renderResults(query: string): void {
    const q = query.trim().toLowerCase();
    if (!q) {
      resultsContainer!.style.display = "none";
      return;
    }

    const matches = products.filter((p) => p.name.toLowerCase().includes(q));

    if (matches.length === 0) {
      innerContainer.innerHTML = `
        <div style="font-size: var(--font-size-sm); color: var(--color-text-muted); font-family: var(--font-mono);">
          No results found
        </div>
      `;
      resultsContainer!.style.display = "block";
      return;
    }

    innerContainer.innerHTML = matches
      .map(
        (p, i) => `
        <a href="${p.href}" style="display: block; text-decoration: none; color: var(--color-text-primary); font-family: var(--font-mono); font-size: var(--font-size-sm); line-height: 2;${i === 0 ? " font-weight: 700;" : ""}">
          ${p.name}
        </a>
      `
      )
      .join("");

    resultsContainer!.style.display = "block";
  }

  input.addEventListener("input", () => {
    renderResults(input.value);
  });

  // Clear results when overlay closes
  document.querySelectorAll("[data-search-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      input.value = "";
      resultsContainer!.style.display = "none";
    });
  });
}

function initShowMore(): void {
  const btn = document.querySelector("[data-show-more]") as HTMLButtonElement | null;
  const grid = document.getElementById("products-grid");
  if (!btn || !grid) return;

  const codes = ["BG-07", "BG-08", "BG-09", "BG-10", "BG-11", "BG-12"];
  const prices = ["₴11,500.00", "₴19,200.00", "₴15,800.00", "₴13,400.00", "₴21,000.00", "₴16,700.00"];
  let batch = 0;

  btn.addEventListener("click", () => {
    const start = batch * 3;
    const end = start + 3;
    if (start >= codes.length) {
      btn.style.display = "none";
      return;
    }

    for (let i = start; i < end && i < codes.length; i++) {
      const card = document.createElement("a");
      card.href = "/pages/product-info";
      card.className = "block";
      card.innerHTML = `
        <div class="group product type-product" data-product-id="0">
          <div class="overflow-hidden woocommerce-product-gallery__image"
            style="aspect-ratio: 430/600; background-color: var(--color-bg-light); margin-bottom: var(--space-4);">
            <div class="w-full h-full transition-transform group-hover:scale-[1.02]"
              style="background: linear-gradient(180deg, #888 0%, #ccc 100%); transition-duration: var(--duration-slow); transition-timing-function: var(--ease-out-quart);"
              role="img" aria-label="${codes[i]}"></div>
          </div>
          <div class="flex items-baseline justify-between" style="gap: var(--space-4);">
            <span class="woocommerce-loop-product__title" style="font-size: var(--font-size-sm);">${codes[i]}</span>
            <span class="price"><span class="woocommerce-Price-amount amount" style="font-size: var(--font-size-sm);">${prices[i]}</span></span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    }

    batch++;
    if (batch * 3 >= codes.length) {
      btn.style.display = "none";
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
  initShowMore();
  initSearchResults();
  initCartBadge();
});
