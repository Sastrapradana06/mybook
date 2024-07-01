import { deleteDataBuku } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const id = body.id;
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
