import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import figcaptionPlugin from "./src/plugin/customRehypePlugin.ts";
import inferImgProperties from "./src/plugin/inferImgProperties.ts"

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://simho.xyz",
  integrations: [react(), mdx(), sitemap()],

  markdown: {
    // Beware of the order of these plugins
    rehypePlugins: [figcaptionPlugin, inferImgProperties],
    syntaxHighlight:{
      excludeLangs: ['mermaid'],
    },
    shikiConfig: {
      theme: "github-dark-dimmed",
    },
  },

  image:{
    service: {
      entrypoint: './src/integrations/high-quality-image-service.ts'
    }
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
