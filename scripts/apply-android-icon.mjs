import { mkdir, readFile, rm } from "node:fs/promises";
import sharp from "sharp";

const svg = await readFile("icons/icon.svg");
const androidRes = "android/app/src/main/res";
const densities = [
  ["mipmap-ldpi", 36],
  ["mipmap-mdpi", 48],
  ["mipmap-hdpi", 72],
  ["mipmap-xhdpi", 96],
  ["mipmap-xxhdpi", 144],
  ["mipmap-xxxhdpi", 192]
];

for (const [folder, size] of densities) {
  const dir = `${androidRes}/${folder}`;
  await mkdir(dir, { recursive: true });
  const png = await sharp(svg).resize(size, size).png().toBuffer();
  await sharp(png).toFile(`${dir}/ic_launcher.png`);
  await sharp(png).toFile(`${dir}/ic_launcher_round.png`);
}

// Use the same legacy launcher artwork on all Android versions.
await rm(`${androidRes}/mipmap-anydpi-v26`, { recursive: true, force: true });
console.log("Android launcher icons generated from icons/icon.svg");
