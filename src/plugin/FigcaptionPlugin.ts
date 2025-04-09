import { visit } from "unist-util-visit";
import type { Node } from "unist";
import type { Element, ElementContent, Text } from "hast";

// Type guards
function isElement(node: Node): node is Element {
  return node.type === "element";
}

function propertiesHaveHref(
  node: Element,
): node is Element & { properties: { href: string } } {
  return !!node.properties?.href;
}

// Types for callouts
type CalloutType = "warning" | "danger" | "caution" | "question" | "default";
type CalloutStyle = {
  className: string;
};

// Callout styles mapping
const CALLOUT_STYLES: Record<CalloutType, CalloutStyle> = {
  warning: { className: "callout bg-red-400/20" },
  danger: { className: "callout bg-red-400/20" },
  caution: { className: "callout bg-red-400/20" },
  question: { className: "callout bg-orange-400/20" },
  default: { className: "callout bg-indigo-400/20" },
};

function rehypePlugin() {
  return (tree: Node) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "blockquote") {
        processBlockquote(node);
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
 * Process blockquote elements to handle callouts
 */
function processBlockquote(node: Element): void {
  const calloutData = extractCalloutData(node);

  if (!calloutData) {
    node.properties = { className: "quote" };
    return;
  }

  const {
    calloutEl,
    firstTextIndex,
    calloutType,
    firstTextSplit,
    calloutElIndex,
  } = calloutData;

  // Apply style based on callout type
  const style =
    CALLOUT_STYLES[calloutType as CalloutType] || CALLOUT_STYLES.default;
  node.properties = { className: style.className };

  // Create header element for callout
  const callOutTextEl: Element = {
    type: "element",
    tagName: "p",
    children: [{ type: "text", value: firstTextSplit[0] }],
    properties: {},
  };

  // Update the existing text node to remove the callout marker
  (calloutEl.children[firstTextIndex] as Text).value = firstTextSplit[1];

  // Insert the callout header
  node.children.splice(calloutElIndex - 1, 0, callOutTextEl);
}

/**
 * Extract callout data from a blockquote if it contains a callout marker
 */
function extractCalloutData(node: Element) {
  const calloutElIndex = node.children.findIndex(
    (child) =>
      child.type === "element" &&
      child.children &&
      child.children.find(
        (grandChild) =>
          grandChild.type === "text" && grandChild.value.startsWith("[!"),
      ),
  );

  if (calloutElIndex < 0) return null;

  const calloutEl = node.children[calloutElIndex] as Element;
  const firstTextIndex = calloutEl.children.findIndex(
    (child) => child.type === "text",
  );

  if (firstTextIndex < 0) return null;

  const firstTextSplit = (
    calloutEl.children[firstTextIndex] as Text
  ).value.split("\n");

  const calloutType = firstTextSplit[0]
    .replace("[!", "")
    .replace("]", "")
    .toLowerCase();

  return {
    calloutEl,
    firstTextIndex,
    calloutType,
    firstTextSplit,
    calloutElIndex,
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
