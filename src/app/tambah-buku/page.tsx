import Button from "@/components/atoms/button";
import FormTambah from "@/components/molecules/form-tambah";
import Loading from "@/components/organisms/loading";
import Link from "next/link";
import { Suspense } from "react";

export default function TambahBuku() {
  return (
    <>
      <div className="w-full h-max">
        <Link href={"/home"}>
          <Button teks="Home" type="button" color="green" size="small" />
        </Link>
      </div>
      <div className="w-full h-max mt-6 lg:mt-6">
        <Suspense fallback={<Loading />}>
          <FormTambah />
        </Suspense>
      </div>
    </>
  );
}
