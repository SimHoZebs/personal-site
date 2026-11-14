import type { ImageTransform, LocalImageService } from "astro";
import sharpService from "astro/assets/services/sharp";

// This file's path is part of Astro's static image URL hash. Rename it (and update
// astro.config.mjs) whenever transform output changes, or browsers will keep the
// old image from its immutable cache.

const HIGH_QUALITY_LEVEL = 95; // Define your desired quality level (e.g., 90)
const MAX_WIDTH = 600;

const customSharpService: LocalImageService = {
  ...sharpService, // Spread the default service to inherit all its properties/methods

  transform(
    buffer: Uint8Array,
    transform: ImageTransform,
    imageConfig,
    logger,
  ) {
    // --- Our Custom Logic ---
    // Set the desired quality and enforce a max width when needed.
    const modifiedTransform: ImageTransform = {
      ...transform,
      quality: HIGH_QUALITY_LEVEL,
    };

    // Extract original width from the source URL (supports encoded URLs)
    let origWidth: number | null = null;
    const srcStr = typeof transform.src === "string" ? transform.src : "";
    console.log(`[HighQualityService] Processing src: ${srcStr}`);

    const match = srcStr.match(/origWidth=(\d+)/);
    if (match) {
      origWidth = parseInt(match[1], 10);
      console.log(`[HighQualityService] Found origWidth: ${origWidth}`);
    } else {
      console.log(`[HighQualityService] No origWidth found in src`);
    }

    // Enforce max width if default/original width larger
    const requestedWidth =
      typeof modifiedTransform.width === "number"
        ? modifiedTransform.width
        : origWidth;

    if (typeof requestedWidth === "number" && requestedWidth > MAX_WIDTH) {
      const scale = MAX_WIDTH / requestedWidth;
      modifiedTransform.width = MAX_WIDTH;

      // Astro 7 passes both width and height and lets Sharp's default "cover" fit
      // handle them, which crops when only the width is reduced. Scale the height
      // down too so the requested aspect ratio is preserved.
      if (typeof modifiedTransform.height === "number") {
        modifiedTransform.height = Math.max(
          1,
          Math.round(modifiedTransform.height * scale),
        );
      }

      console.log(
        `[HighQualityService] Capped width from ${requestedWidth} to ${MAX_WIDTH}`,
      );
    }

    // Delegate the actual transformation to the original Sharp service
    console.log(
      `[HighQualityService] Transforming ${transform.src} with quality=${modifiedTransform.quality} width=${modifiedTransform.width}`,
    ); // Optional logging
    return sharpService.transform(
      buffer,
      modifiedTransform as any,
      imageConfig,
      logger,
    );
  },
  // We likely don't need to override parseURL or getHTMLAttributes
  // parseURL: sharpService.parseURL,
  // getHTMLAttributes: sharpService.getHTMLAttributes,
  // Since we spread sharpService above, these are already inherited
};

// Export the custom service
export default customSharpService;
