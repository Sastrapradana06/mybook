"use client";

import Button from "@/components/atoms/button";
import Link from "next/link";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Produk() {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const tableRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const getDataApi = async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page}`
    );
    const result = await res.json();
    if (result && result.products) {
      if (page === 0) {
        setData(result.products);
      } else {
        setData((prev) => [...prev, ...result.products]);
      }

      if (result.products.length < 10 || result.products.length === 0) {
        setHasMore(false);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const element = tableRef.current;
      if (
        element &&
        element.scrollHeight - element.scrollTop <= element.clientHeight + 1 &&
        hasMore &&
        !isLoading
      ) {
        setPage((prev) => prev + 10);
      }
    };

    const element = tableRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore, isLoading]);

  useEffect(() => {
    getDataApi();
  }, [page]);

  return (
    <>
      <div className="w-full h-max flex gap-2 items-center">
        <Link href={"/home"}>
          <Button teks="Home" type="button" color="green" size="small" />
        </Link>
      </div>
      <div className="mt-3">
        <h1 className="text-[1.3rem] font-semibold text-yellow-600">
          My Product
        </h1>
      </div>
      <div
        className="relative max-h-[300px] overflow-x-auto shadow-md sm:rounded-lg mt-4"
        ref={tableRef}
      >
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-lime-600 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Produk
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Harga
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, i: any) => (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{i + 1}</td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
                >
                  {item.title}
                </td>
                <td className="px-6 py-4 capitalize">{item.category}</td>
                <td className="px-6 py-4 capitalize">{item.brand}</td>
                <td className="px-6 py-4 capitalize flex gap-2">
                  $
                  <span className="text-green-500 font-semibold">
                    {item.price}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && (
          <div className="w-full h-max bg-transparent p-2 flex justify-center items-center">
            <AiOutlineLoading3Quarters
              size={30}
              className="text-white animate-spin"
            />
          </div>
        )}
      </div>
    </>
  );
}
