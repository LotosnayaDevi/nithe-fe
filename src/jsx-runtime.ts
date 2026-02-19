export type Child = string | number | boolean | null | undefined | Child[];
export type Props = Record<string, unknown> & { children?: Child | Child[] };
export type Component = (props: Props) => string;

const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img",
  "input", "link", "meta", "param", "source", "track", "wbr",
]);

const ATTR_MAP: Record<string, string> = {
  className: "class",
  htmlFor: "for",
  tabIndex: "tabindex",
  viewBox: "viewBox",
  strokeWidth: "stroke-width",
  strokeLinecap: "stroke-linecap",
  strokeLinejoin: "stroke-linejoin",
  fillRule: "fill-rule",
  clipRule: "clip-rule",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderChildren(children: Child | Child[]): string {
  if (children == null || children === false || children === true) return "";
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(renderChildren).join("");
  return "";
}

function renderAttrs(props: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(props)) {
    if (key === "children" || key === "key" || key === "ref") continue;
    if (value == null || value === false) continue;
    if (key === "dangerouslySetInnerHTML") continue;

    const attr = ATTR_MAP[key] ?? key;

    if (value === true) {
      parts.push(` ${attr}`);
    } else if (typeof value === "string") {
      parts.push(` ${attr}="${escapeHtml(value)}"`);
    } else {
      parts.push(` ${attr}="${escapeHtml(String(value))}"`);
    }
  }
  return parts.join("");
}

export function jsx(
  tag: string | Component,
  props: Props,
): string {
  if (typeof tag === "function") {
    return tag(props);
  }

  const attrs = renderAttrs(props);
  const tagName = tag;

  if (VOID_ELEMENTS.has(tagName)) {
    return `<${tagName}${attrs} />`;
  }

  let inner: string;
  if (props.dangerouslySetInnerHTML) {
    inner = (props.dangerouslySetInnerHTML as { __html: string }).__html;
  } else {
    inner = renderChildren(props.children);
  }

  return `<${tagName}${attrs}>${inner}</${tagName}>`;
}

export { jsx as jsxs, jsx as jsxDEV };

export function Fragment(props: { children?: Child | Child[] }): string {
  return renderChildren(props.children);
}
