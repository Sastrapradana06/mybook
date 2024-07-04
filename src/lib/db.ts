const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

type DataBuku = {
  image: string | null;
  judulBuku: string;
  jenisBuku: string;
  penerbit: string;
  tahunTerbit: string;
};

export async function handleLogin(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const { password: passwordUser } = user;

    if (passwordUser === password) {
      return user;
    }
    return null;
  } catch (error) {
    console.error(`Error retrieving user by email: ${error}`);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getDataBuku() {
  try {
    const data = await prisma.Buku.findMany();
    return data;
  } catch (error) {
    console.error(`Error retrieving data buku: ${error}`);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function addDataBuku(data: any) {
  try {
    const buku = await prisma.Buku.create({
      data,
    });
    return buku;
  } catch (error) {
    console.error(`Error creating data buku: ${error}`);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteDataBuku(id: number) {
  try {
    const buku = await prisma.Buku.delete({
      where: {
        id: id,
      },
    });
    return buku;
  } catch (error) {
    console.error(`Error deleting data buku: ${error}`);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getBukuById(id: number) {
  try {
    const bukuId = await prisma.Buku.findUnique({
      where: {
        id: id,
      },
    });
    return bukuId;
  } catch (error) {
    console.error(`Error deleting data buku: ${error}`);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateDataBuku(id: any, data: any) {
  try {
    const buku = await prisma.Buku.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
    return buku;
  } catch (error) {
    console.error(`Error updating data buku: ${error}`);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
