import Button from "@/components/atoms/button";
import Table from "@/components/organisms/table";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

export default async function Home() {
  const prisma = new PrismaClient();
  const data = await prisma.buku.findMany();

  return (
    <>
      <div className="w-full h-max">
        <Link href={"/tambah-buku"}>
          <Button teks="Tambah Buku" type="button" color="green" size="small" />
        </Link>
      </div>
      <div className="w-full h-max mt-5">
        <Table data={data} />
      </div>
    </>
  );
}
