import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import figcaptionPlugin from "./src/plugin/FigcaptionPlugin";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],

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