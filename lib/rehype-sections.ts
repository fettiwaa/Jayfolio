import type { Element, ElementContent, Root, RootContent } from "hast";

/** "Lessons Learned" → "lessons-learned". Shared with the case-study contents list. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function textOf(node: ElementContent): string {
  if (node.type === "text") return node.value;
  if (node.type === "element") return node.children.map(textOf).join("");
  return "";
}

/**
 * Rehype plugin: wraps each top-level <h2> and the content after it (up to the
 * next <h2>) in <section class="cs-section" id="…">, so every case-study
 * section renders as its own panel. Content before the first <h2> is left as is.
 */
export function rehypeSections() {
  return (tree: Root) => {
    const result: RootContent[] = [];
    let current: Element | null = null;

    for (const node of tree.children) {
      if (node.type === "element" && node.tagName === "h2") {
        current = {
          type: "element",
          tagName: "section",
          properties: {
            className: ["cs-section"],
            id: slugifyHeading(node.children.map(textOf).join("")),
          },
          children: [node],
        };
        result.push(current);
      } else if (
        current &&
        node.type !== "doctype" &&
        node.type !== "mdxjsEsm"
      ) {
        // MDX import/export statements (mdxjsEsm) must stay at the top level.
        current.children.push(node);
      } else {
        result.push(node);
      }
    }

    tree.children = result;
  };
}
