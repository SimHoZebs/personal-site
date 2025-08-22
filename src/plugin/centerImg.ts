import { visit } from "unist-util-visit";
import type { Node } from "unist";
import type { Element } from "hast";

// Type guards
function isElement(node: Node): node is Element {
  return node.type === "element";
}

// Instead of separate plugins, we handle multiple transformations to eliminate repeated traversals
function rehypePlugin() {
  return (tree: Node) => {
    visit(tree, "element", (node: Element) => {
      if (
        node.tagName === "p" &&
        node.children.length === 1 &&
        isElement(node.children[0]) &&
        node.children[0].tagName === "img"
      ) {
        centerImg(node);
      }
    });
  };
}

const centerImg = (node: Element): void => {
  node.properties = {
    ...node.properties,
    className: "self-center",
  };
};

export default rehypePlugin;
