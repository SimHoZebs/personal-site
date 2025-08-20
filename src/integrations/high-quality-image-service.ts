import type { ImageTransform, LocalImageService } from "astro";
import sharpService from "astro/assets/services/sharp";

const HIGH_QUALITY_LEVEL = 95; // Define your desired quality level (e.g., 90)

const customSharpService: LocalImageService = {
  ...sharpService, // Spread the default service to inherit all its properties/methods

  transform(buffer: Uint8Array, transform: ImageTransform, imageConfig) {
    // --- Our Custom Logic ---
    // Set the desired quality if not explicitly provided or potentially override
    // For simplicity, we'll set it directly.
    // A more complex implementation could check if transform.quality already exists.
    const modifiedTransform: ImageTransform = {
      ...transform,
      quality: HIGH_QUALITY_LEVEL,
    };
    // --- End Custom Logic ---

    // Delegate the actual transformation to the original Sharp service
    console.log(
      `[HighQualityService] Transforming ${transform.src} with quality=${modifiedTransform.quality}`,
    ); // Optional logging
    return sharpService.transform(buffer, modifiedTransform, imageConfig);
  },
  // We likely don't need to override parseURL or getHTMLAttributes
  // parseURL: sharpService.parseURL,
  // getHTMLAttributes: sharpService.getHTMLAttributes,
  // Since we spread sharpService above, these are already inherited
};

// Export the custom service
export default customSharpService;
