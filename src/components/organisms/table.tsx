import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Button from "../atoms/button";

type TableProps = {
  id: number;
  judulBuku: string;
  jenisBuku: string;
  penerbit: string;
  tahunTerbit: String;
};

export default function Table({
  data,
  funcDelete,
  funcEdit,
}: {
  data: any;
  funcDelete: any;
  funcEdit: any;
}) {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs  uppercase bg-[#4D44B5] text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Judul Buku
              </th>
              <th scope="col" className="px-6 py-3">
                Jenis Buku
              </th>
              <th scope="col" className="px-6 py-3">
                Penebit
              </th>
              <th scope="col" className="px-6 py-3">
                Tahun Terbit
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: TableProps, i: any) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={i}
              >
                <td className="px-6 py-4">{i + 1}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
                >
                  {item.judulBuku}
                </th>
                <td className="px-6 py-4">{item.jenisBuku}</td>
                <td className="px-6 py-4">{item.penerbit}</td>
                <td className="px-6 py-4">{item.tahunTerbit}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <Button
                    icons={<CiEdit size={20} className="text-white" />}
                    type="button"
                    color="green"
                    size="small"
                    func={() => funcEdit(item.id)}
                  />
                  <Button
                    icons={<MdDeleteOutline size={20} className="text-white" />}
                    type="button"
                    color="red"
                    size="small"
                    func={() => funcDelete(item.id)}
                  />
                  {/* <button
                    className="p-1 rounded-md bg-green-600"
                    onClick={() => editData(item.id)}
                  >
                    <CiEdit size={20} className="text-white" />
                  </button> */}
                  {/* <button
                    className="p-1 rounded-md bg-red-600"
                    onClick={() => deleteData(item.id)}
                  >
                    <MdDeleteOutline size={20} className="text-white" />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
