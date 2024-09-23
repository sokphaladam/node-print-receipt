import { createCanvas } from "canvas";

export function createTextImage(
  text: any,
  width: number,
  height: number,
  fontSize?: number
) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  ctx.font = `${fontSize ? fontSize : 22}pt "Khmer OS System"`; // Make sure this font is installed on your system
  ctx.fillStyle = "black";
  const lines = text.split("\n");
  let y = 20;
  for (let i = 0; i < lines.length; i++) {
    if (i === 2) {
      ctx.font = `30pt "Khmer OS System"`;
    } else {
      ctx.font = `${fontSize ? fontSize : 22}pt "Khmer OS System"`;
    }
    ctx.fillText(lines[i], 10, y);
    y += 20;
  }
  return canvas.toBuffer("image/png");
}
