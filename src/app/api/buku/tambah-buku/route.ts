import { addDataBuku } from "@/lib/db";
import fs from "fs";
import path from "path";
// export async function POST(req: Request) {
//   const body = await req.json();

//   try {
//     if (!body.id) {
//       const data = {
//         image: body.image,
//         judulBuku: body.judul_buku,
//         jenisBuku: body.jenis_buku,
//         penerbit: body.penerbit,
//         tahunTerbit: body.tahun_terbit,
//       };
//       const procces = await addDataBuku(data);
//       if (procces)
//         return Response.json({
//           status: true,
//           message: "berhasil menambahkan buku",
//         });
//       return Response.json({
//         status: false,
//         message: "Gagal menambahkan buku",
//       });
//     } else {
//       const id = body.id;
//       const dataEdit = {
//         image: body.image,
//         judulBuku: body.judul_buku,
//         jenisBuku: body.jenis_buku,
//         penerbit: body.penerbit,
//         tahunTerbit: body.tahun_terbit,
//       };

//       const procces = await updateDataBuku(id, dataEdit);
//       if (procces)
//         return Response.json({
//           status: true,
//           message: "berhasil mengedit buku",
//         });
//       return Response.json({ status: false, message: "Gagal mengedit buku" });
//     }
//   } catch (error) {
//     return Response.json({ status: false, message: "Gagal" });
//   }
// }

export async function POST(req: Request) {
  const body = await req.formData();
  const file = body.get("file");
  const judulBuku = body.get("judul_buku");
  const jenisBuku = body.get("jenis_buku");
  const penerbit = body.get("penerbit");
  const tahunTerbit = body.get("tahun_terbit");

  try {
    let imgUrl = "";
    if (file && file instanceof Blob) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const publicDir = path.join(process.cwd(), "public", "uploads");
      const filePath = path.join(publicDir, file.name);

      fs.writeFileSync(filePath, buffer);
      const url = `/uploads/${file.name}`;
      imgUrl = url;
    }

    const data = {
      image: imgUrl,
      judulBuku,
      jenisBuku,
      penerbit,
      tahunTerbit,
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
  } catch (error) {
    console.log({ error });

    return Response.json({ status: false, message: "Terjadi kesalahan" });
  }
}

// if (file && file instanceof Blob) {
//   const arrayBuffer = await file.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);

//   const path = join("/", "tmp", file.name);
//   await writeFile(path, buffer);
//   imgUrl = path;
//   console.log({ imgUrl });
// }
