"use client";
import Button from "@/components/atoms/button";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { useState } from "react";
import "./anime.css";

type AnimeProps = {
  id: number;
  name: string;
  studio: string;
};

const dataAnime = [
  {
    id: 1,
    name: "Kimetsu no Yaiba",
    studio: "ufotable",
  },
  {
    id: 2,
    name: "Black Clover",
    studio: "Studio Pierrot",
  },
  {
    id: 3,
    name: "Jujutsu Kaisen",
    studio: "Mappa",
  },
  {
    id: 4,
    name: "Hunter x Hunter",
    studio: "Madhouse",
  },
];

const SortableItem = ({
  id,
  children,
}: {
  id: number;
  children: React.ReactNode;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: isDragging ? "2px dashed yellow" : "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-is-dragging={isDragging}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export default function Anime() {
  const [items, setItems] = useState<AnimeProps[]>(dataAnime);

  const handleDrag = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setItems((prevItems) => {
        const activeIndex = prevItems.findIndex(
          (item) => item.id.toString() === active.id
        );
        const overIndex = prevItems.findIndex(
          (item) => item.id.toString() === over.id
        );
        const newArr = [...prevItems];
        newArr.splice(overIndex, 0, ...newArr.splice(activeIndex, 1));
        return newArr;
      });
    }
  };

  return (
    <>
      <div className="w-full h-max flex gap-2 items-center">
        <Link href="/home">
          <Button teks="Home" type="button" color="green" size="small" />
        </Link>
        <Link href="/produk">
          <Button teks="Product" type="button" color="green" size="small" />
        </Link>
      </div>
      <div className="mt-3 ">
        <h1 className="text-[1.3rem] font-semibold text-yellow-600">
          Top Anime
        </h1>
        <p className="text-[.9rem] text-gray-300">
          Drag Card untuk mengurutkan
        </p>
      </div>
      <DndContext onDragEnd={handleDrag}>
        <div className="w-full h-max mt-6 pb-10">
          <SortableContext
            items={items.map((item) => item.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            <div className="w-full flex flex-col gap-4 items-center">
              {items.map((data, i) => (
                <SortableItem id={data.id} key={data.id}>
                  <div className="w-[400px] h-[100px] border rounded-md bg-teal-600 flex flex-col justify-center items-center transition-transform duration-300 ease-in-out">
                    <h1 className="text-[1rem] font-semibold tracking-[1px] text-yellow-500">
                      #{i + 1}
                    </h1>
                    <h1 className="text-[1.2rem] font-semibold tracking-[1px]">
                      {data.name}
                    </h1>
                    <p className="uppercase">{data.studio}</p>
                  </div>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
}
