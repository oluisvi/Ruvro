import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = "C:/Users/Home/Downloads/WhatsApp Unknown 2026-09-12 at 3.34.55 PM";
const spinRoot = "C:/Users/Home/Downloads/ruvro_360_gerados/ruvro_360_gerados";
const outputRoot = path.resolve("public/media/community");

const assets = [
  ["iwc-portofino-moon-phase", "01-iwc-portofino-360.png", ["WhatsApp Image 2026-09-12 at 2.02.42 PM.jpeg", "WhatsApp Image 2026-09-12 at 2.02.42 PM (1).jpeg", "WhatsApp Image 2026-09-12 at 2.02.42 PM (2).jpeg"]],
  ["iwc-pilots-watch-turquoise", "02-iwc-pilot-turquesa-360.png", ["WhatsApp Image 2026-09-12 at 2.02.42 PM (4).jpeg", "WhatsApp Image 2026-09-12 at 2.02.42 PM (3).jpeg", "WhatsApp Image 2026-09-12 at 2.02.43 PM.jpeg"]],
  ["cartier-automatic", "03-cartier-roxo-360.png", ["WhatsApp Image 2026-09-12 at 2.02.43 PM (3).jpeg", "WhatsApp Image 2026-09-12 at 2.02.43 PM (1).jpeg", "WhatsApp Image 2026-09-12 at 2.02.43 PM (2).jpeg"]],
  ["omega-aqua-terra-worldtimer", "04-omega-worldtimer-360.png", ["WhatsApp Image 2026-09-12 at 2.02.44 PM.jpeg", "WhatsApp Image 2026-09-12 at 2.02.44 PM (1).jpeg"]],
  ["iwc-pilots-watch-chronograph", "05-iwc-pilot-verde-360.png", ["WhatsApp Image 2026-09-12 at 2.02.44 PM (3).jpeg", "WhatsApp Image 2026-09-12 at 2.02.44 PM (4).jpeg", "WhatsApp Image 2026-09-12 at 2.02.44 PM (2).jpeg"]],
  ["rolex-sea-dweller", "06-rolex-sea-dweller-360.png", ["WhatsApp Image 2026-09-12 at 2.02.44 PM (5).jpeg"]],
  ["jaeger-lecoultre-geographic", "07-jaeger-lecoultre-360.png", ["WhatsApp Image 2026-09-12 at 2.02.45 PM (1).jpeg", "WhatsApp Image 2026-09-12 at 2.02.45 PM (3).jpeg", "WhatsApp Image 2026-09-12 at 2.02.45 PM.jpeg"]],
  ["heuer-vintage-chronograph-a", "08-heuer-vintage-360-a.png", ["WhatsApp Image 2026-09-12 at 2.02.45 PM (2).jpeg", "WhatsApp Image 2026-09-12 at 2.02.45 PM (4).jpeg", "WhatsApp Image 2026-09-12 at 2.02.45 PM (5).jpeg"]],
  ["jaeger-lecoultre-master-ultra-thin-moon", "09-jaeger-lecoultre-master-ultra-thin-moon-360.png", ["WhatsApp Image 2026-09-12 at 2.02.45 PM (1).jpeg", "WhatsApp Image 2026-09-12 at 2.02.45 PM (3).jpeg"]],
  ["heuer-vintage-chronograph-b", "10-heuer-vintage-360-b.png", ["WhatsApp Image 2026-09-12 at 2.02.45 PM (2).jpeg", "WhatsApp Image 2026-09-12 at 2.02.45 PM (4).jpeg", "WhatsApp Image 2026-09-12 at 2.02.45 PM (5).jpeg"]],
  ["h-moser-streamliner", "11-h-moser-360.png", ["WhatsApp Image 2026-09-12 at 2.02.46 PM (4).jpeg", "WhatsApp Image 2026-09-12 at 2.02.46 PM (2).jpeg", "WhatsApp Image 2026-09-12 at 2.02.46 PM (1).jpeg"]],
  ["rolex-cosmograph-daytona", "12-rolex-daytona-360.png", ["WhatsApp Image 2026-09-12 at 2.02.46 PM (3).jpeg", "WhatsApp Image 2026-09-12 at 2.02.46 PM.jpeg"]],
  ["rolex-perpetual-1908", "13-rolex-1908-360.png", ["WhatsApp Image 2026-09-12 at 2.02.47 PM (1).jpeg"]],
  ["audemars-piguet-royal-oak-offshore", "14-audemars-piguet-royal-oak-offshore-360.png", ["WhatsApp Image 2026-09-12 at 2.02.47 PM (2).jpeg"]],
  ["vacheron-constantin-222", "15-vacheron-constantin-360.png", ["WhatsApp Image 2026-09-12 at 2.02.47 PM (3).jpeg", "WhatsApp Image 2026-09-12 at 2.02.47 PM (4).jpeg", "WhatsApp Image 2026-09-12 at 2.02.47 PM (5).jpeg", "WhatsApp Image 2026-09-12 at 2.02.48 PM (1).jpeg", "WhatsApp Image 2026-09-12 at 2.02.48 PM.jpeg"]],
  ["breitling-navitimer", "16-breitling-navitimer-360.png", ["WhatsApp Image 2026-09-12 at 2.02.48 PM (3).jpeg", "WhatsApp Image 2026-09-12 at 2.02.48 PM (2).jpeg", "WhatsApp Image 2026-09-12 at 2.02.48 PM (4).jpeg"]],
];

await rm(outputRoot, { recursive: true, force: true });

for (const [slug, sheetName, gallery] of assets) {
  const destination = path.join(outputRoot, slug);
  await mkdir(destination, { recursive: true });

  for (const [index, filename] of gallery.entries()) {
    await sharp(path.join(sourceRoot, filename))
      .rotate()
      .webp({ quality: 88, smartSubsample: true })
      .toFile(path.join(destination, `gallery-${String(index + 1).padStart(2, "0")}.webp`));
  }

  const sheetPath = path.join(spinRoot, sheetName);
  const metadata = await sharp(sheetPath).metadata();
  const frameWidth = Math.floor(metadata.width / 3);
  const frameHeight = Math.floor(metadata.height / 2);

  for (let index = 0; index < 6; index += 1) {
    const column = index % 3;
    const row = Math.floor(index / 3);
    await sharp(sheetPath)
      .extract({ left: column * frameWidth, top: row * frameHeight, width: frameWidth, height: frameHeight })
      .webp({ quality: 90, smartSubsample: true })
      .toFile(path.join(destination, `spin-${String(index + 1).padStart(2, "0")}.webp`));
  }
}

console.log(`Processed ${assets.length} watches into ${outputRoot}`);
