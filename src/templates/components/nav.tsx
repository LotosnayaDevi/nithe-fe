interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Corsets", href: "/pages/catalog?category=corsets" },
  { label: "Dresses", href: "/pages/catalog?category=dresses" },
  { label: "Tops", href: "/pages/catalog?category=tops" },
  { label: "About", href: "/pages/about" },
  { label: "Contact", href: "/pages/contact" },
];

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
    </svg>
  );
}

export interface NavProps {
  activePath?: string;
  cartCount?: number;
}

function isLinkActive(activePath: string | undefined, linkHref: string): boolean {
  if (!activePath) return false;
  if (activePath === linkHref) return true;
  if (activePath === "/" || linkHref === "/") return activePath === linkHref;
  const linkBase = linkHref.split("?")[0];
  // Skip query-param links — handled client-side
  if (linkHref.includes("?")) return false;
  return linkBase.endsWith(activePath);
}

export function Nav({ activePath, cartCount = 0 }: NavProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style="background-color: var(--color-bg-dark); border-color: var(--color-border-dark);"
    >
      <nav className="relative flex items-center justify-between" style="padding: 24px 60px;">
        {/* Logo */}
        <a href="/" className="relative z-10">
          <img src="/assets/images/logo.png" alt="NYTHE" style="height: 44px; width: auto;" />
        </a>

        {/* Desktop nav links — absolutely centered */}
        <div
          className="hidden md:flex items-center justify-center absolute inset-0"
          style="gap: 36px; pointer-events: none;"
        >
          {NAV_LINKS.map((link) => {
            const isActive = isLinkActive(activePath, link.href);
            return (
              <a
                href={link.href}
                className={`relative transition-colors hover:text-white ${isActive ? "text-white" : ""}`}
                style={`font-size: var(--font-size-sm); pointer-events: auto; color: ${isActive ? "var(--color-text-inverse)" : "var(--color-text-muted)"};`}
                data-nav
              >
                {link.label}
                {isActive && (
                  <img
                    src="/assets/images/underline.png"
                    alt=""
                    style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: calc(100% + 8px); height: auto; pointer-events: none;"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right section */}
        <div className="relative z-10 flex items-center" style="gap: var(--space-4); color: var(--color-text-inverse);">
          <div className="hidden lg:block relative">
            <button
              className="flex items-center cursor-pointer"
              style="gap: var(--space-2); font-size: var(--font-size-sm); color: var(--color-text-muted); background: none; border: none;"
              data-locale-toggle
            >
              Ukraine <span style="color: var(--color-border-dark);">|</span> UAH &#x20b4;
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* Locale dropdown panel */}
            <div
              className="dropdown-panel dropdown-hidden"
              style="position: absolute; top: 100%; right: 0; margin-top: var(--space-2); min-width: 14rem; background-color: var(--color-bg-surface); border: 1px solid var(--color-border-light); box-shadow: 0 4px 12px rgba(0,0,0,0.08); z-index: 60; padding: var(--space-2) 0;"
              data-locale-dropdown
            >
              <button
                className="flex items-center w-full text-left cursor-pointer"
                style="gap: var(--space-2); font-size: var(--font-size-sm); color: var(--color-text-primary); padding: var(--space-2) var(--space-4); background: none; border: none;"
                data-locale-option="ua"
              >
                Ukraine / UAH &#x20b4;
              </button>
              <button
                className="flex items-center w-full text-left cursor-pointer"
                style="gap: var(--space-2); font-size: var(--font-size-sm); color: var(--color-text-primary); padding: var(--space-2) var(--space-4); background: none; border: none;"
                data-locale-option="us"
              >
                United States / USD $
              </button>
              <button
                className="flex items-center w-full text-left cursor-pointer"
                style="gap: var(--space-2); font-size: var(--font-size-sm); color: var(--color-text-primary); padding: var(--space-2) var(--space-4); background: none; border: none;"
                data-locale-option="eu"
              >
                Europe / EUR &euro;
              </button>
            </div>
          </div>
          <a href="#" className="transition-opacity hover:opacity-70" aria-label="Search" data-search-toggle>
            <SearchIcon />
          </a>
          <a href="#" className="transition-opacity hover:opacity-70" aria-label="Account">
            <AccountIcon />
          </a>
          <a href="/pages/cart" className="relative transition-opacity hover:opacity-70" aria-label="Cart">
            <CartIcon />
            <span
              className="cart-contents-count"
              style={`position: absolute; top: -6px; right: -8px; font-size: 0.625rem; background-color: var(--color-accent); color: var(--color-text-inverse); width: 16px; height: 16px; border-radius: 50%; display: ${cartCount > 0 ? "flex" : "none"}; align-items: center; justify-content: center; line-height: 1;`}
            >
              {String(cartCount)}
            </span>
          </a>
          <button
            className="md:hidden transition-opacity hover:opacity-70"
            style="color: var(--color-text-inverse);"
            id="nav-toggle"
            aria-label="Toggle menu"
          >
            <HamburgerIcon />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id="nav-mobile" className="hidden md:hidden" style="border-top: 1px solid var(--color-border-dark); background-color: var(--color-bg-dark);">
        <div className="flex flex-col" style="padding: var(--space-4) var(--page-padding); gap: var(--space-4);">
          {NAV_LINKS.map((link) => (
            <a
              href={link.href}
              style={`font-size: var(--font-size-sm); color: ${isLinkActive(activePath, link.href) ? "var(--color-text-inverse)" : "var(--color-text-muted)"};`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
