type dataPostType = {
  id?: number | string;
  image: string;
  judul_buku: string;
  jenis_buku: string;
  penerbit: string;
  tahun_terbit: string;
};

export const apiPostData = async (resource: string, data: dataPostType) => {
  const res = await fetch(`api/${resource}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const dataJson = await res.json();
  return dataJson;
};

export const apiDeleteData = async (resource: string, id: number | string) => {
  const res = await fetch(`api/${resource}`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const dataJson = await res.json();
  return dataJson;
};

export const apiGetById = async (
  resource: string,
  id: number | string | null
) => {
  const res = await fetch(`http://localhost:3000/api/${resource}=${id}`);
  const resJson = await res.json();
  return resJson;
};
