interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Corsets", href: "/pages/catalog?category=corsets" },
  { label: "Dresses", href: "/pages/catalog?category=dresses" },
  { label: "Tops", href: "/pages/catalog?category=tops" },
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
}

export function Nav({ activePath }: NavProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style="background-color: var(--color-bg-dark); border-color: var(--color-border-dark); height: var(--nav-height);"
    >
      <nav className="flex items-center justify-between h-full" style="max-width: var(--max-width); margin: 0 auto; padding: 0 var(--page-padding);">
        {/* Logo */}
        <a href="/" className="flex flex-col leading-none" style="color: var(--color-text-inverse);">
          <span
            className="uppercase"
            style="font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); letter-spacing: var(--tracking-widest);"
          >
            NYTHE
          </span>
          <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">/nai&theta;/</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center" style="gap: var(--space-8);">
          {NAV_LINKS.map((link) => (
            <a
              href={link.href}
              className={`transition-colors hover:text-white ${activePath === link.href ? "text-white" : ""}`}
              style={`font-size: var(--font-size-sm); color: ${activePath === link.href ? "var(--color-text-inverse)" : "var(--color-text-muted)"};`}
              data-nav
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center" style="gap: var(--space-4); color: var(--color-text-inverse);">
          <span className="hidden lg:flex items-center" style="gap: var(--space-2); font-size: var(--font-size-sm); color: var(--color-text-muted);">
            Ukraine <span style="color: var(--color-border-dark);">|</span> UAH &#x20b4;
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
          <a href="#" className="transition-opacity hover:opacity-70" aria-label="Search" data-search-toggle>
            <SearchIcon />
          </a>
          <a href="/account" className="transition-opacity hover:opacity-70" aria-label="Account">
            <AccountIcon />
          </a>
          <a href="/pages/cart" className="transition-opacity hover:opacity-70" aria-label="Cart">
            <CartIcon />
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
              style={`font-size: var(--font-size-sm); color: ${activePath === link.href ? "var(--color-text-inverse)" : "var(--color-text-muted)"};`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
