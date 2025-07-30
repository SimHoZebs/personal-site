// src/lib/high-quality-image-service.ts
import type {
  LocalImageService,
  ImageTransform,
  LocalImageTransform,
} from "astro";
// Import the default Sharp service implementation directly
import sharpService from "astro/assets/services/sharp";

const HIGH_QUALITY_LEVEL = 90; // Define your desired quality level (e.g., 90)

// Create our custom service object, wrapping the default Sharp service
const customSharpService: LocalImageService = {
  ...sharpService, // Spread the default service to inherit all its properties/methods

  // Override the transform function
  async transform(
    buffer: Uint8Array,
    transform: LocalImageTransform,
    imageConfig,
  ) {
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

  // Override getURL to ensure quality is set for dev/SSR requests
  // Note: getURL generates the URL for the internal _image endpoint
  getURL(options, imageConfig) {
    const modifiedOptions = {
      ...options,
      quality: HIGH_QUALITY_LEVEL,
    };
    console.log(
      `[HighQualityService] Generating URL for ${options.src} with quality=${modifiedOptions.quality}`,
    ); // Optional logging
    return sharpService.getURL(modifiedOptions, imageConfig);
  },

  // We likely don't need to override parseURL or getHTMLAttributes
  // parseURL: sharpService.parseURL,
  // getHTMLAttributes: sharpService.getHTMLAttributes,
  // Since we spread sharpService above, these are already inherited
};

// Export the custom service
export default customSharpService;
