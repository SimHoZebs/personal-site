import { CollectionEntry } from "astro:content";

const getTitle = (
  content: CollectionEntry<"blogs"> | CollectionEntry<"projects">,
) => {
  return (
    content.data.title ||
    content.filePath?.split("/").at(-1)?.slice(0, -3) ||
    content.id.split("/").at(-1) ||
    "untitled"
  );
};

export default getTitle;
