import { visit } from 'unist-util-visit';
import type { Node } from 'unist';
import type { Element, ElementContent, Text } from 'hast';

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

        const calloutElIndex = node.children.findIndex((child) => child.type === "element" && child.children && child.children.find(grandChild => grandChild.type === "text" && grandChild.value.startsWith("[!")));

        node.properties = { className: calloutElIndex != -1 ? "callout" : "quote" };


        if (calloutElIndex < 0) return;

        const calloutEl = node.children[calloutElIndex] as Element;
        const firstTextIndex = (calloutEl).children.findIndex(child => child.type === "text");

        if (firstTextIndex < 0) return;

        const firstTextSplit = (calloutEl.children[firstTextIndex] as Text).value.split("\n");
        const calloutType = firstTextSplit[0].replace("[!", "").replace("]", "").toLowerCase();

        switch (calloutType) {
          case "warning":
          case "danger":
          case "caution":
            node.properties.className = "callout bg-red-400/20";
            break;
          case "question":
            node.properties.className = "callout bg-orange-400/20";
            break;
          default:
            node.properties.className = "callout bg-indigo-400/20";
            break;
        }

        const callOutTextEl: Element = {
          type: "element",
          tagName: "p",
          children: [
            {
              type: "text",
              value: firstTextSplit[0]
            }
          ],
          properties: {}
        };

        (calloutEl.children[firstTextIndex] as Text).value = firstTextSplit[1];
        node.children.splice(calloutElIndex - 1, 0, callOutTextEl);


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
