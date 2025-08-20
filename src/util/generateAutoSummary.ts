const CHAR_PER_MIN = 238;
const skip = /^[!#>]|^\\-/; // Avoid callouts, headings, images

export function generateAutoSummary(body: string): string {
  const paragraphs = body.split("\n");
  let autoSummary = "";

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].trim();
    if (paragraph.match(skip) || paragraph === "") continue;

    autoSummary += paragraph + " ";
    // Strip markdown
    autoSummary = autoSummary.replace(/[*_]/g, "");
    autoSummary = autoSummary.replace(/\[(.*?)\]\(.*?\)/g, "$1"); // Replace links with link text

    if (autoSummary.length > CHAR_PER_MIN) {
      autoSummary = `${autoSummary.slice(0, CHAR_PER_MIN)}`;
      break;
    }
  }

  return autoSummary;
}
