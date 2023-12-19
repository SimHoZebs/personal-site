import { visit } from 'unist-util-visit';
import type { Node } from 'unist';
import type { Element, ElementContent } from 'hast';

function isElement(node: Node): node is Element {
  return node.type === 'element';
}

function propertiesHaveHref(node: Element): node is Element & { properties: { href: string; }; } {
  return !!(node.properties && node.properties.href);
}

function rehypePlugin() {
  return (tree: Node) => {
    visit(tree, 'element', (node: Element) => {

      //callout and quote distinction
      if (node.tagName === "blockquote") {

        const pEl = node.children.find((child) => child.type === "element" && child.children && child.children.find(grandChild => grandChild.type === "text" && grandChild.value.startsWith("[!")));

        node.properties = { className: pEl ? "callout" : "quote" };

      }

      if (node.tagName !== 'p') return;

      //relative link fixes
      const aEl = node.children.find(child => isElement(child) && child.tagName === 'a') as Element | undefined;

      if (aEl && propertiesHaveHref(aEl)) {
        console.log("href", aEl.properties.href);

        if ((aEl.properties.href).startsWith('./')) {
          aEl.properties.href = aEl.properties.href.replaceAll("%20", "-").toLowerCase();
        }

      }

      // figure-figcaption
      if (node.children.length < 2 || !node.children.find((child) => (child.type === 'element' && child.tagName === 'img'))) return;

      const figcaptionNode: ElementContent = {
        type: 'element',
        tagName: 'figcaption',
        children: node.children.slice(1),
        properties: {}
      };

      node.tagName = 'figure';
      node.children = [node.children[0], figcaptionNode];

    });
  };
}

export default rehypePlugin;
