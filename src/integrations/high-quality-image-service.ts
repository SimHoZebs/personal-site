import type { ImageTransform, LocalImageService } from "astro";
import sharpService from "astro/assets/services/sharp";

const HIGH_QUALITY_LEVEL = 95; // Define your desired quality level (e.g., 90)
const MAX_WIDTH = 600;

const customSharpService: LocalImageService = {
  ...sharpService, // Spread the default service to inherit all its properties/methods

  transform(buffer: Uint8Array, transform: ImageTransform, imageConfig) {
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
    const originalWidthValue = modifiedTransform.width;
    if (typeof modifiedTransform.width === "number") {
      if (modifiedTransform.width > MAX_WIDTH) {
        modifiedTransform.width = MAX_WIDTH;
        console.log(
          `[HighQualityService] Capped explicit width from ${originalWidthValue} to ${MAX_WIDTH}`,
        );
      }
    } else if (typeof origWidth === "number" && origWidth > MAX_WIDTH) {
      modifiedTransform.width = MAX_WIDTH;
      console.log(
        `[HighQualityService] Set width to ${MAX_WIDTH} based on origWidth ${origWidth}`,
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
    );
  },
  // We likely don't need to override parseURL or getHTMLAttributes
  // parseURL: sharpService.parseURL,
  // getHTMLAttributes: sharpService.getHTMLAttributes,
  // Since we spread sharpService above, these are already inherited
};

// Export the custom service
export default customSharpService;
