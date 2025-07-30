// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// 2. Define a `type` and `schema` for each collection
const projectCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      summary: z.string(),
      headerImage: image().optional(),
      headerAlt: z.string().optional(),
      isArchive: z.boolean().optional(),
      order: z.number(),
      link: z
        .object({
          name: z.string(),
          url: z.string(),
          icon: z.string().optional(),
        })
        .array()
        .optional(),
    }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./content/blogs" }),
  schema: () =>
    z.object({
      title: z.string().optional(),
      summary: z.string().optional(),
      published: z.date().optional(),
      edited: z.date().optional(),
      isArchive: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  projects: projectCollection,
  blogs: blogCollection,
};
