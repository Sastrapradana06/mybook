import { deleteDataBuku } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  try {
    const id = body.id;
    if (body.image != "") {
      const fileName = path.basename(body.image);
      const publicDir = path.join(process.cwd(), "public", "uploads");
      const perviousPath = path.join(publicDir, fileName);

      if (fs.existsSync(perviousPath)) {
        fs.unlinkSync(perviousPath);
      }
    }

    const procces = await deleteDataBuku(id);
    if (procces)
      return Response.json({
        status: true,
        mesagess: "berhasil menghapus buku",
      });
    return Response.json({ status: false, message: "Gagal" });
  } catch (error) {
    return Response.json({ status: false, message: "Gagal" });
  }
}
