import type { Element, Text } from "hast";

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

function blockquoteToCallout(blockquote: Element) {
  const calloutHeaderIndex = blockquote.children.findIndex(
    (child) =>
      child.type === "element" &&
      child.children &&
      child.children.find(
        (grandChild) =>
          grandChild.type === "text" && grandChild.value.startsWith("[!"),
      ),
  );

  if (calloutHeaderIndex < 0) {
    blockquote.properties = { className: "quote" };
    return;
  }

  const callout = blockquote.children[calloutHeaderIndex] as Element;
  const calloutTextNodeIndex = callout.children.findIndex(
    (child) => child.type === "text",
  );

  if (calloutTextNodeIndex < 0) {
    blockquote.properties = { className: "quote" };
    return;
  }

  const calloutTextArray = (
    callout.children[calloutTextNodeIndex] as Text
  ).value.split("\n");

  const calloutType = calloutTextArray[0]
    .replace("[!", "")
    .replace("]", "")
    .toLowerCase();

  // Apply style based on callout type
  const style =
    CALLOUT_STYLES[calloutType as CalloutType] || CALLOUT_STYLES.default;
  blockquote.properties = { className: style.className };

  // Create header element for callout
  const calloutHeader: Element = {
    type: "element",
    tagName: "p",
    children: [{ type: "text", value: calloutType }],
    properties: {},
  };

  // Update the existing text node to remove the callout marker
  (callout.children[calloutTextNodeIndex] as Text).value = calloutTextArray[1];

  // Insert the callout header
  blockquote.children.splice(calloutHeaderIndex - 1, 0, calloutHeader);
}

export default blockquoteToCallout;
