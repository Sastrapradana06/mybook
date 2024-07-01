import { getDataBuku } from "@/lib/db";

export async function GET() {
  try {
    const data = await getDataBuku();

    if (data) return Response.json({ status: true, data });
    return Response.json({ status: false, data: [] });
  } catch (error) {}
  return Response.json({ status: false, message: "Gagal" });
}
