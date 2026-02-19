import { SearchOverlay } from "../components/search-overlay";

interface BaseProps {
  title: string;
  children: string;
  bodyClass?: string;
  pageScript?: string;
}

export function Base({ title, children, bodyClass, pageScript }: BaseProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/styles.css" />
        <title>{title}</title>
      </head>
      <body className={bodyClass ?? ""} style="display: flex; flex-direction: column; min-height: 100vh;">
        {children}
        <SearchOverlay />
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <script type="module" src="/assets/main.js"></script>
        {pageScript && <script type="module" src={`/assets/${pageScript}.js`} />}
      </body>
    </html>
  );
}

export function Page({ title, children, bodyClass, pageScript }: BaseProps) {
  return (
    "<!doctype html>\n" +
    Base({ title, children, bodyClass, pageScript })
  );
}
