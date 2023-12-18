import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import figcaptionPlugin from "./src/plugin/FigcaptionPlugin";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), mdx()],
  markdown: {
    rehypePlugins: [figcaptionPlugin]
  }
});
