import { visit } from "unist-util-visit";
import type { Node } from "unist";
import type { Element, ElementContent } from "hast";
import blockquoteToCallout from "./blockquoteToCallout";

// Type guards
function isElement(node: Node): node is Element {
  return node.type === "element";
}

function propertiesHaveHref(
  node: Element,
): node is Element & { properties: { href: string } } {
  return !!node.properties?.href;
}

function rehypePlugin() {
  console.log("rehypePlugin initialized");
  return (tree: Node) => {
    visit(tree, "element", (node: Element) => {
      console.log("Processing node:", node.tagName);
      if (node.tagName === "blockquote") {
        console.log("Processing blockquote to callout");
        blockquoteToCallout(node);
      } else if (node.tagName === "table" && !node.properties.className) {
        wrapTableWithScrollContainer(node);
      } else if (node.tagName === "img" && node.properties.alt) {
        processImageAlt(node);
      } else if (node.tagName === "p") {
        processParagraph(node);
      }
    });
  };
}

/**
 * Wrap tables with a scrollable container
 */
function wrapTableWithScrollContainer(node: Element): void {
  const clone = structuredClone(node);
  clone.properties.className = "inside";

  node.tagName = "div";
  node.properties = { className: "overflow-x-scroll w-full" };
  node.children = [clone];
}

/**
 * Process image alt text to extract width information
 */
function processImageAlt(node: Element): void {
  const altText = node.properties.alt as string;
  const [alt, width] = altText.split("|");

  if (width) {
    node.properties.width = width;
    node.properties.alt = alt; // Update alt text to remove width part
  }
}

/**
 * Process paragraphs for relative links and figure-figcaption transformation
 */
function processParagraph(node: Element): void {
  // Fix relative markdown links
  fixRelativeLinks(node);

  // Convert paragraph with image to figure-figcaption
  transformToFigureIfNeeded(node);
}

/**
 * Fix relative markdown links
 */
function fixRelativeLinks(node: Element): void {
  const aEl = node.children.find(
    (child) => isElement(child) && child.tagName === "a",
  ) as Element | undefined;

  if (aEl && propertiesHaveHref(aEl) && aEl.properties.href.endsWith(".md")) {
    aEl.properties.href = aEl.properties.href
      .replaceAll("%20", "-")
      .replace(".md", "")
      .toLowerCase();
  }
}

/**
 * Transform paragraph with image to figure-figcaption structure
 */
function transformToFigureIfNeeded(node: Element): void {
  const hasImage = node.children.some(
    (child) => isElement(child) && child.tagName === "img",
  );

  if (!hasImage || node.children.length < 2) return;

  const figcaptionNode: ElementContent = {
    type: "element",
    tagName: "figcaption",
    children: node.children.slice(1),
    properties: {},
  };

  node.tagName = "figure";
  node.children = [node.children[0], figcaptionNode];
}

export default rehypePlugin;
