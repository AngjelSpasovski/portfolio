import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public", "og-image.svg");
const output = path.join(root, "public", "og-image.png");

await sharp(source, { density: 144 })
  .resize(1200, 630, { fit: "fill" })
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(`Generated ${path.relative(root, output)} at 1200 x 630.`);
