import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import figcaptionPlugin from "./src/plugin/FigcaptionPlugin";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.simho.xyz",
  integrations: [react(), mdx(), sitemap()],

  markdown: {
    rehypePlugins: [figcaptionPlugin],
    shikiConfig: {
      theme: "github-dark-dimmed",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});

