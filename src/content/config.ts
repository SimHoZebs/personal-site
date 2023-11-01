// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const projectCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      headerImage: image().optional(),
      headerAlt: z.string().optional(),
      order: z.number(),
      github: z.string(),
      link: z
        .object({
          name: z.string(),
          url: z.string(),
          icon: z.string().optional(),
        })
        .array()
        .optional(),
      live: z.string().optional(),
    }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      isDraft: z.boolean(),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  projects: projectCollection,
  blogs: blogCollection,
};
