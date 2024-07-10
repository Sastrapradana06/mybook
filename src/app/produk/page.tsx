"use client";

import Button from "@/components/atoms/button";
import DraggableTable from "@/components/organisms/draggable-table";
import Link from "next/link";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Produk() {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const tableRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const getDataApi = async () => {
    if (isSearch) return;
    setIsLoading(true);
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const result = await res.json();
    if (result && result.products) {
      if (page === 0) {
        setData(result.products);
      } else {
        setData((prev) => [...prev, ...result.products]);
      }

      if (result.products.length < 10 && result.products.length != 0) {
        setHasMore(false);
      }
    }

    setIsLoading(false);
  };

  const columnsTable = ["No", "Title", "Category", "Brand", "Price"];

  const cariProduk = async () => {
    setIsSearch(true);
    if (!data || search.length < 3) return;

    const res = await fetch(
      `https://dummyjson.com/products/search?q=${search.toLocaleLowerCase()}`
    );
    const dataJson = await res.json();
    if (dataJson.products.length === 0) return;
    setData(dataJson.products);
    setHasMore(false);
    setPage(0);
  };

  const resetSearch = async () => {
    setSearch("");
    setPage(0);
    setHasMore(true);
    setData([]);
    getDataApi();
    setIsSearch(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const element = tableRef.current;
      if (
        element &&
        element.scrollHeight - element.scrollTop <= element.clientHeight + 1 &&
        hasMore &&
        !isLoading &&
        data.length > 0 &&
        !isSearch
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
  }, [page, isSearch]);

  return (
    <>
      <div className="w-full h-max flex gap-2 items-center">
        <Link href={"/home"}>
          <Button teks="Home" type="button" color="green" size="small" />
        </Link>
        <Link href={"/anime"}>
          <Button teks="Anime" type="button" color="green" size="small" />
        </Link>
      </div>
      <div className="mt-3">
        <h1 className="text-[1.3rem] font-semibold text-yellow-600">
          Product List
        </h1>
      </div>
      <div className="max-w-md mt-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 ">
            {search.length < 3 ? (
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            ) : (
              <button
                onClick={resetSearch}
                className="cursor-pointer relative z-50"
              >
                <svg
                  className="w-3 h-3 cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            )}
          </div>
          <input
            type="search"
            id="default-search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cari Produk"
            required
          />
          <button
            type="button"
            onClick={cariProduk}
            className="text-white absolute end-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[.7rem] px-3 py-[.4rem] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
      <div
        className="relative max-h-[350px] overflow-x-auto shadow-md sm:rounded-lg mt-4"
        ref={tableRef}
      >
        {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
        </table> */}
        <DraggableTable columnsTable={columnsTable} items={data ? data : []} />
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
