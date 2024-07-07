"use client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "@/components/atoms/button";
import Link from "next/link";
import { MutableRefObject, useEffect, useRef, useState } from "react";

export default function Anime() {
  const initialData = [
    {
      id: 1,
      judul: "Naruto",
      studio: "Studio Pierrot",
      genre: "Action, Shounen",
    },
    {
      id: 2,
      judul: "Kimetsu no Yaiba",
      studio: "Ufotable",
      genre: "Action, Shounen",
    },
    {
      id: 3,
      judul: "One Piece",
      studio: "Toei Animation",
      genre: "Action, Adventure",
    },
    {
      id: 4,
      judul: "Attack on Titan",
      studio: "Wit Studio",
      genre: "Action, Drama",
    },
    {
      id: 5,
      judul: "My Hero Academia",
      studio: "Bones",
      genre: "Action, Comedy",
    },
  ];

  const dataAnime = [
    ...initialData,
    {
      id: 6,
      judul: "Sword Art Online",
      studio: "A-1 Pictures",
      genre: "Action, Fantasy",
    },
    {
      id: 7,
      judul: "Death Note",
      studio: "Madhouse",
      genre: "Mystery, Psychological",
    },
    {
      id: 8,
      judul: "Fullmetal Alchemist: Brotherhood",
      studio: "Bones",
      genre: "Action, Adventure",
    },
    {
      id: 9,
      judul: "Dragon Ball Z",
      studio: "Toei Animation",
      genre: "Action, Adventure",
    },
    {
      id: 10,
      judul: "Hunter x Hunter",
      studio: "Madhouse",
      genre: "Action, Adventure",
    },
  ];

  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleData = () => {
    if (data.length >= dataAnime.length) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextData = dataAnime.slice(data.length, data.length + 1);
      setData((prevData) => [...prevData, ...nextData]);
      setIsLoading(false);
    }, 3000); // Simulasi waktu pemuatan data
  };

  const tableRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = tableRef.current;
      if (
        element &&
        element.scrollHeight - element.scrollTop === element.clientHeight
      ) {
        handleData();
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
  }, [data]);

  return (
    <>
      <div className="w-full h-max flex gap-2 items-center">
        <Link href={"/home"}>
          <Button teks="Home" type="button" color="green" size="small" />
        </Link>
      </div>
      <div className="mt-3 ">
        <h1 className="text-[1.3rem] font-semibold text-yellow-600">
          Data Anime
        </h1>
      </div>
      <div
        className="relative max-h-[280px] overflow-x-auto shadow-md sm:rounded-lg mt-4"
        ref={tableRef}
      >
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs  uppercase bg-lime-600 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Judul
              </th>
              <th scope="col" className="px-6 py-3">
                Studio
              </th>
              <th scope="col" className="px-6 py-3">
                Genre
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, i: any) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{i + 1}</td>

                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
                >
                  {item.judul}
                </td>
                <td className="px-6 py-4 capitalize">{item.studio}</td>
                <td className="px-6 py-4 capitalize">{item.genre}</td>
                {/* <td className="px-6 py-4 flex items-center gap-3">
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
                    func={() => deleteData(item.id, item.image)}
                  />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && (
          <div className="w-full h-max bg-transparent  p-2 flex justify-center items-center">
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
