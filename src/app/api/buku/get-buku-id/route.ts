import { getBukuById } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  try {
    const bukuId = await getBukuById(Number(id));
    if (bukuId) return Response.json({ status: true, data: bukuId });
    return Response.json({ status: false, data: [] });
  } catch (error) {
    return Response.json({ status: false, message: "Gagal" });
  }
}
