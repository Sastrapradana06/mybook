import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  const body = await req.formData();
  const file = body.get("image");

  if (!file || !(file instanceof Blob)) {
    return new Response(JSON.stringify({ status: false, message: "Gagal" }), {
      status: 400,
    });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  //   Cara 1 mengubah menjadi url base64
  //   const base64Image = buffer.toString("base64");
  //   const mimeType = file.type;
  //   const base64URL = `data:${mimeType};base64,${base64Image}`;

  //   return Response.json({ status: true, url: base64URL });

  //   Cara 2
  const path = join("/", "tmp", file.name);
  await writeFile(path, buffer);
  console.log(`File saved to ${path}`);
  return Response.json({ status: true, url: path });
}
