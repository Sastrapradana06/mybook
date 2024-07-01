import LoginForm from "@/components/molecules/login-form";

export default function Home() {
  return (
    <main className="w-full h-[100vh]  flex justify-center items-center flex-col gap-1">
      <div className="w-[90%] lg:w-[50%] p-4">
        <h1 className="text-3xl">Halaman Login</h1>
        <p className="text-[.9rem] text-gray-300">
          <span className="text-[#4D44B5] font-semibold text-[1rem]">
            MyBook
          </span>{" "}
          , Website penyimpanan buku
        </p>
      </div>
      <div className="w-[90%] lg:w-[50%] h-max p-4 ">
        <LoginForm />
      </div>
    </main>
  );
}
