"use client";

import Button from "@/components/atoms/button";
import Loading from "@/components/organisms/loading";
import Table from "@/components/organisms/table";
import AppShell from "@/components/template/app-shell";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    status: false,
    type: "",
    message: "",
  });

  const router = useRouter();

  const apiGetData: any = async () => {
    const res = await fetch("http://localhost:3000/api/buku/get-buku", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    const resData = await res.json();
    if (!resData.status) return null;
    return setData(resData.data);
  };

  const deleteData = async (id: number) => {
    setIsLoading(true);
    const res = await fetch("http://localhost:3000/api/buku/hapus-buku", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.status) {
      apiGetData();
      setMessage({
        status: true,
        type: "success",
        message: "Berhasil menghapus buku",
      });
    } else {
      setMessage({
        status: true,
        type: "error",
        message: "Gagal",
      });
    }

    setIsLoading(false);
  };

  const editData = (id: number) => {
    router.push(`/tambah-buku?id=${id}`);
  };

  useEffect(() => {
    apiGetData();
  }, []);

  return (
    <AppShell>
      {isLoading ? <Loading /> : null}
      {message.status &&
        (message.type === "success" ? (
          <div className="w-max mb-2 h-max m-auto">
            <h1 className="text-[.9rem] text-green-500 font-semibold">
              {message.message}
            </h1>
          </div>
        ) : (
          <div className="w-max mb-2 h-max m-auto">
            <h1 className="text-[.9rem] text-red-500 font-semibold">
              {message.message}
            </h1>
          </div>
        ))}
      <div className="w-full h-max">
        <Link href={"/tambah-buku"}>
          <Button teks="Tambah Buku" type="button" color="green" size="small" />
        </Link>
      </div>
      <div className="w-full h-max mt-5">
        <Table data={data} funcDelete={deleteData} funcEdit={editData} />
      </div>
    </AppShell>
  );
}
