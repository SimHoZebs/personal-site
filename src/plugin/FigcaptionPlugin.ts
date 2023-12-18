import { visit } from 'unist-util-visit';
import type { Node } from 'unist';
import type { Element, ElementContent } from 'hast';

function rehypePlugin() {
  return (tree: Node) => {
    visit(tree, 'element', (node: Element) => {

      if (node.tagName === "blockquote") {

        const pEl = node.children.find((child) => child.type === "element" && child.children && child.children.find(grandChild => grandChild.type === "text" && grandChild.value.startsWith("[!")));

        node.properties = { className: pEl ? "callout" : "quote" };

      }

      if (node.tagName !== 'p') return;

      if (node.children.length < 2 || !node.children.find((child) => (child.type === 'element' && child.tagName === 'img'))) return;

      const figcaptionNode: ElementContent = {
        type: 'element',
        tagName: 'figcaption',
        children: node.children.slice(1),
        properties: {}
      };

      const figureNode: ElementContent = {
        type: 'element',
        tagName: 'figure',
        children: [node.children[0], figcaptionNode],
        properties: {}
      };

      node.children = [figureNode];

    });
  };
}

export default rehypePlugin;
