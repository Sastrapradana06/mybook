"use client";

import { useRef, useState } from "react";
import Button from "../atoms/button";
import { convertFileToBase64 } from "@/utils";

export default function UploadFile({ setUrl }: { setUrl: any }) {
  const [image, setImage] = useState("");
  const refImage = useRef<HTMLInputElement>(null);

  const handleBtn = () => {
    refImage.current?.click();
  };

  const handlePilihFile = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const urlImg = URL.createObjectURL(file);
    setImage(urlImg);

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/file", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    if (data.status) setUrl(data.url);
  };

  return (
    <div className="w-full h-max flex flex-col gap-2">
      <img
        src={image}
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
  );
}
