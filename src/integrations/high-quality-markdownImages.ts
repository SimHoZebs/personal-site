// src/integrations/high-quality-markdown.ts
import type { AstroIntegration } from "astro";
import { fileURLToPath } from "node:url";
import path from "node:path";

export default function highQualityMarkdownImages(): AstroIntegration {
  return {
    name: "high-quality-markdown-images",
    hooks: {
      "astro:config:setup": ({ config, updateConfig }) => {
        // Resolve the absolute path to our custom service entrypoint
        const serviceEntrypoint = path.join(
          fileURLToPath(config.srcDir), // Use config.srcDir which resolves to your src/ directory
          "lib/high-quality-image-service.ts", // Path relative to srcDir
        );

        console.log(
          `[HighQualityIntegration] Setting image service entrypoint to: ${serviceEntrypoint}`,
        );

        // Update the Astro config to use our custom service entrypoint
        updateConfig({
          image: {
            ...config.image, // Preserve existing image config
            service: {
              // Point Astro to the file exporting our custom service
              entrypoint: serviceEntrypoint,
            },
          },
        });
      },
    },
  };
}
