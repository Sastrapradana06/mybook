"use client";

import useHandleInput from "@/hooks/useHandleInput";
import Button from "../atoms/button";
import Input from "../atoms/input";
import { useEffect, useRef, useState } from "react";
import Loading from "../organisms/loading";
import { useRouter, useSearchParams } from "next/navigation";
import { apiGetById, apiPostData } from "@/services/apiServices";
import { convertFileToBase64 } from "@/utils";
import UploadFile from "./upload-file";

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
    refImage.current?.click();
  };

  const handlePilihFile = async (e: any) => {
    const file = e.target.files[0];
    console.log({ file });

    if (!file) return;
    const urlImg = await convertFileToBase64(file);
    handleChange({ target: { name: "image", value: urlImg } });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await apiPostData("buku/tambah-buku", value);

      if (data.status) {
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
    } catch (error) {
      setMessage({
        status: true,
        message: "Gagal",
      });
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    setIsLoading(true);
    const resData = await apiGetById("buku/get-buku-id?id", idEdit);
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
        <div className="w-max mb-4  h-max m-auto">
          <h1 className="text-[.9rem] text-yellow-500 font-semibold capitalize">
            {message.message}
          </h1>
        </div>
      )}
      <form
        className="w-full h-max lg:w-[60%]  m-auto flex flex-col gap-3 pb-11"
        onSubmit={handleSubmit}
      >
        <UploadFile
          setUrl={(e: any) =>
            handleChange({ target: { name: "image", value: e } })
          }
        />
        {/* <div className="w-full h-max flex flex-col gap-2">
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
        </div> */}
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
