import { updateDataBuku } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  const body = await req.formData();
  const file = body.get("file");
  const id = body.get("id");
  const image = body.get("image");
  const judulBuku = body.get("judul_buku");
  const jenisBuku = body.get("jenis_buku");
  const penerbit = body.get("penerbit");
  const tahunTerbit = body.get("tahun_terbit");

  try {
    let imgUrl = "";
    if (file && file instanceof Blob) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = path.basename(String(image));
      const publicDir = path.join(process.cwd(), "public", "uploads");
      const perviousPath = path.join(publicDir, fileName);

      if (fs.existsSync(perviousPath) && image !== "") {
        fs.unlinkSync(perviousPath);
        console.log(image, "ada");
      }
      const filePath = path.join(publicDir, file.name);

      fs.writeFileSync(filePath, buffer);
      const url = `/uploads/${file.name}`;
      imgUrl = url;
    } else {
      imgUrl = image ? String(image) : "";
    }

    const data = {
      image: imgUrl,
      judulBuku,
      jenisBuku,
      penerbit,
      tahunTerbit,
    };

    const procces = await updateDataBuku(id, data);
    if (procces)
      return Response.json({
        status: true,
        message: "berhasil mengedit buku",
      });
    return Response.json({
      status: false,
      message: "Gagal mengedit buku",
    });
  } catch (error) {
    console.log({ error });

    return Response.json({ status: false, message: "Terjadi kesalahan" });
  }
}
