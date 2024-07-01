import Navbar from "../organisms/navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-[100vh] relative">
      <Navbar />
      <div className="w-[90%] h-max m-auto mt-[130px]">{children}</div>
    </main>
  );
}
