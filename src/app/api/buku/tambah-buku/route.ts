import { addDataBuku, updateDataBuku } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  console.log({ body });

  try {
    if (!body.id) {
      const data = {
        judulBuku: body.judul_buku,
        jenisBuku: body.jenis_buku,
        penerbit: body.penerbit,
        tahunTerbit: body.tahun_terbit,
      };
      const procces = await addDataBuku(data);
      if (procces)
        return Response.json({
          status: true,
          message: "berhasil menambahkan buku",
        });
      return Response.json({
        status: false,
        message: "Gagal menambahkan buku",
      });
    } else {
      const id = body.id;
      const dataEdit = {
        judulBuku: body.judul_buku,
        jenisBuku: body.jenis_buku,
        penerbit: body.penerbit,
        tahunTerbit: body.tahun_terbit,
      };

      const procces = await updateDataBuku(id, dataEdit);
      if (procces)
        return Response.json({
          status: true,
          message: "berhasil mengedit buku",
        });
      return Response.json({ status: false, message: "Gagal mengedit buku" });
    }
  } catch (error) {
    return Response.json({ status: false, message: "Gagal" });
  }
}
