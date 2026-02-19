/** Simple client-side navigation helpers for the multi-page app. */

export function initNav(): void {
  // Highlight the active nav link based on current path
  const currentPath = window.location.pathname;
  document.querySelectorAll<HTMLAnchorElement>("nav a[data-nav]").forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
}
