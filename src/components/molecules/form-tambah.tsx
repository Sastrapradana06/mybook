"use client";

import useHandleInput from "@/hooks/useHandleInput";
import Button from "../atoms/button";
import Input from "../atoms/input";
import { useEffect, useRef, useState } from "react";
import Loading from "../organisms/loading";
import { useRouter, useSearchParams } from "next/navigation";

export default function FormTambah() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    status: false,
    message: "",
  });
  const refImage = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const idEdit = searchParams.get("id");

  const { value, handleChange, editData, resetValue } = useHandleInput({
    image: "",
    judul_buku: "",
    jenis_buku: "",
    penerbit: "",
    tahun_terbit: "",
  });

  const handleBtn = () => {
    console.log("pilih file");
    refImage.current?.click();
  };

  const handlePilihFile = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataValue = { ...value, image: reader.result as string };
      editData(dataValue);
    };
  };

  console.log({ value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("http://localhost:3000/api/buku/tambah-buku", {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.status) {
      // router.push("/home");
      setMessage({
        status: true,
        message: data.message,
      });
      resetValue();
    } else {
      setMessage({
        status: true,
        message: data.message,
      });
    }
    setIsLoading(false);
  };

  const handleEdit = async () => {
    setIsLoading(true);
    const res = await fetch(
      `http://localhost:3000/api/buku/get-buku-id?id=${idEdit}`
    );
    const resData = await res.json();
    if (resData.status) {
      const dataEdit = {
        id: resData.data.id,
        image: resData.data.image,
        judul_buku: resData.data.judulBuku,
        jenis_buku: resData.data.jenisBuku,
        penerbit: resData.data.penerbit,
        tahun_terbit: resData.data.tahunTerbit,
      };
      editData(dataEdit);
    } else {
      router.push("/home");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (idEdit) {
      handleEdit();
    }
  }, [idEdit]);

  return (
    <>
      {isLoading ? <Loading /> : null}
      {message.status && (
        <div className="w-max mb-2 h-max m-auto">
          <h1 className="text-[.9rem] text-blue-500 font-semibold capitalize">
            {message.message}
          </h1>
        </div>
      )}
      <form
        className="w-full h-max lg:w-[60%]  m-auto flex flex-col gap-3 mb-5"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-max flex flex-col gap-2">
          <img
            src={value.image}
            alt=""
            className="w-[300px] h-[250px] border rounded-md object-cover"
          />
          <Button
            teks="Pilih Gambar"
            type="button"
            color="green"
            size="small"
            func={handleBtn}
          />
          <input
            type="file"
            ref={refImage}
            onChange={handlePilihFile}
            name="image"
            className="hidden"
          />
        </div>
        <div className="w-full  h-max">
          <div className="mb-5">
            <label
              htmlFor="judul_buku"
              className="block mb-2 text-[1rem] font-medium text-gray-900 dark:text-white"
            >
              Judul Buku <span className="text-[crimson]">*</span>
            </label>
            <Input
              name="judul_buku"
              type="text"
              size="small"
              value={value.judul_buku}
              setValue={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="jenis_buku"
              className="block mb-2 text-[1rem] font-medium text-gray-900 dark:text-white"
            >
              Jenis Buku <span className="text-[crimson]">*</span>
            </label>
            <Input
              name="jenis_buku"
              type="text"
              size="small"
              value={value.jenis_buku}
              setValue={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="penebit"
              className="block mb-2 text-[1rem] font-medium text-gray-900 dark:text-white"
            >
              Penerbit <span className="text-[crimson]">*</span>
            </label>
            <Input
              name="penerbit"
              type="text"
              size="small"
              value={value.penerbit}
              setValue={handleChange}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="tahun_terbit"
              className="block mb-2 text-[1rem] font-medium text-gray-900 dark:text-white"
            >
              Tahun Terbit <span className="text-[crimson]">*</span>
            </label>
            <Input
              name="tahun_terbit"
              type="text"
              size="small"
              value={value.tahun_terbit}
              setValue={handleChange}
            />
          </div>
        </div>
        <Button teks="Simpan" type="submit" color="blue" size="small" />
      </form>
    </>
  );
}
