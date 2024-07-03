"use client";

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Button from "../atoms/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";

type TableProps = {
  id: number;
  image: string;
  judulBuku: string;
  jenisBuku: string;
  penerbit: string;
  tahunTerbit: String;
};

export default function Table({ data }: { data: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    status: false,
    type: "",
    message: "",
  });

  const router = useRouter();

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

  return (
    <>
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs  uppercase bg-[#4D44B5] text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Judul Buku
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Jenis Buku
              </th>
              <th scope="col" className="px-6 py-3">
                Penebit
              </th>
              <th scope="col" className="px-6 py-3">
                Tahun Terbit
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: TableProps, i: any) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={i}
              >
                <td className="px-6 py-4">{i + 1}</td>

                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
                >
                  {item.judulBuku}
                </td>
                <td className=" py-4 px-4">
                  <img
                    src={item.image}
                    className="w-[40px] h-[40px] border object-cover rounded-full "
                    alt="image"
                  />
                </td>
                <td className="px-6 py-4 capitalize">{item.jenisBuku}</td>
                <td className="px-6 py-4 capitalize">{item.penerbit}</td>
                <td className="px-6 py-4">{item.tahunTerbit}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <Button
                    icons={<CiEdit size={20} className="text-white" />}
                    type="button"
                    color="green"
                    size="small"
                    func={() => editData(item.id)}
                  />
                  <Button
                    icons={<MdDeleteOutline size={20} className="text-white" />}
                    type="button"
                    color="red"
                    size="small"
                    func={() => deleteData(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
