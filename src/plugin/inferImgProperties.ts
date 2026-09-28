import type { Element } from "hast";
import type { Node } from "unist";
import { visit } from "unist-util-visit";

// Instead of separate plugins, we handle multiple transformations to eliminate repeated traversals
function rehypePlugin() {
  return (tree: Node) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img" && node.properties.alt) {
        processImageAlt(node);
      }
    });
  };
}

function processImageAlt(node: Element): void {
  const altText = node.properties.alt as string;
  const [alt, width] = altText.split("|");

  if (width) {
    node.properties.width = width;
    node.properties.alt = alt; // Update alt text to remove width part
  }
}

export default rehypePlugin;
