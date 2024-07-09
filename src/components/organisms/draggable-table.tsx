import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortItemsHandler: any = ({ id, children }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: isDragging ? "2px dashed white" : "none",
  };

  return (
    <th ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </th>
  );
};

const DraggableTable = ({ columnsTable, items }: any) => {
  const [columns, setColumns] = useState<string[]>(columnsTable);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const oldIndex = columns.indexOf(active.id);
    const newIndex = columns.indexOf(over.id);

    if (oldIndex !== newIndex) {
      setColumns(arrayMove(columns, oldIndex, newIndex));
    }
  };

  const renderCell = (item: any, column: string, index: number) => {
    if (column === "No") {
      return (
        <td className="px-6 py-4 border-r border-gray-500">{index + 1}</td>
      );
    } else {
      const value = item[column.toLowerCase()];

      return (
        <th
          scope="row"
          className="px-6 py-4 border-r border-gray-500 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {value == undefined ? "-" : value}
        </th>
      );
    }

    switch (column) {
      case "No":
        return <td className="px-6 py-4">{index + 1}</td>;
      case "Name":
        return (
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {item.name}
          </th>
        );
      case "Jenis":
        return <td className="px-6 py-4">{item.jenis}</td>;
      default:
        return null;
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {items.length != 0 && (
        <table className="w-full text-sm  text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead className="text-xs uppercase bg-lime-600 text-white">
            <SortableContext
              items={columns}
              strategy={horizontalListSortingStrategy}
            >
              <tr>
                {columns.map((column) => (
                  <SortItemsHandler key={column} id={column}>
                    <th scope="col" className="px-6 py-3 ">
                      {column}
                    </th>
                  </SortItemsHandler>
                ))}
              </tr>
            </SortableContext>
          </thead>
          <tbody>
            {items.map((item: any, i: number) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={item.id}
              >
                {columns.map((column) => renderCell(item, column, i))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DndContext>
  );
};

export default DraggableTable;
