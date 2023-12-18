import { visit } from 'unist-util-visit';
import type { Node } from 'unist';
import type { Element, ElementContent } from 'hast';

function rehypePlugin() {
  return (tree: Node) => {
    visit(tree, 'element', (node: Element) => {

      if (node.tagName === 'p') {
        const imgIndex = node.children.findIndex((child) => child.type === 'element' && child.tagName === 'img');

        const pIndex = node.children.findIndex((child) => child.type === 'text');

        if (imgIndex !== -1 && pIndex !== -1) {

          const figcaptionNode: ElementContent = {
            type: 'element',
            tagName: 'figcaption',
            children: [node.children[pIndex]],
            properties: {}
          };

          const figureNode: ElementContent = {
            type: 'element',
            tagName: 'figure',
            children: [node.children[imgIndex], figcaptionNode],
            properties: {}
          };


          node.children = [figureNode];
        }
      }
    });
  };
}

export default rehypePlugin;
