"use client";

import Button from "@/components/atoms/button";
import Link from "next/link";
import { useDroppable } from "@dnd-kit/core";

import { useDraggable } from "@dnd-kit/core";
import DraggableTable from "@/components/organisms/draggable-table";

interface Card {
  id: number;
  name: string;
  jenis: string;
}

const dataProduk: Card[] = [
  {
    id: 1,
    name: "Material UI",
    jenis: "Component Librarys",
  },
  {
    id: 2,
    name: "Tailwind UI",
    jenis: "Component Librarys",
  },
  {
    id: 3,
    name: "React Js",
    jenis: "Javascript Librarys",
  },
  {
    id: 4,
    name: "Next Js",
    jenis: "Javascript Librarys",
  },
];

const Draggable: any = ({ id, children }: any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const Droppable: any = ({ id, children }: any) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className="w-[350px] h-[400px] border rounded-md p-2">
      {children}
    </div>
  );
};

const Test = () => {
  return (
    <>
      <div className="w-full h-max flex gap-2 items-center">
        <Link href={"/home"}>
          <Button teks="Home" type="button" color="green" size="small" />
        </Link>
        <Link href={"/produk"}>
          <Button teks="Product" type="button" color="green" size="small" />
        </Link>
        <Link href={"/anime"}>
          <Button teks="Anime" type="button" color="dark" size="small" />
        </Link>
      </div>

      <DraggableTable
        columnsTable={["No", "Name", "Jenis"]}
        items={dataProduk ? dataProduk : []}
      />
      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-gray-800 border-b border-gray-400 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-600">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-500">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-800 border-b border-gray-400">
              <th
                scope="row"
                className="px-6 py-4 font-medium bg-gray-600 text-blue-50 whitespace-nowrap dark:text-blue-100"
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4 bg-gray-600">Laptop</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </>
  );
};

export default Test;
