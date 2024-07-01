"use client";

import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { useState } from "react";
import useHandleInput from "@/hooks/useHandleInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const { value, handleChange, resetValue } = useHandleInput({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    const res = await signIn("credentials", {
      email: value.email,
      password: value.password,
      redirect: false,
    });

    if (!res?.ok) {
      setMessage("Periksa kembali email dan password anda");
      return;
    }
    router.push("/home");
    resetValue();
    console.log({ res });
  };

  return (
    <form className="w-full h-max" onSubmit={handleSubmit}>
      {message != "" && (
        <div className="w-full mb-3 -mt-2">
          <p className="text-[crimson]">{message}</p>
        </div>
      )}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Masukkan Email <span className="text-[crimson]">*</span>
        </label>
        <Input
          name="email"
          type="email"
          placeholder="name@gmail.com"
          size="small"
          value={value.email}
          setValue={handleChange}
        />
      </div>
      <div className="w-full flex flex-col gap-2 text-[.9rem] mb-5">
        <label htmlFor="password">
          Masukkan Password <span className="text-[crimson]">*</span>
        </label>
        <div className="relative w-full">
          <input
            type={isShowPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Masukkan Password"
            value={value.password}
            onChange={handleChange}
            className="w-full border p-3 outline-[#4D44B5] rounded-lg pr-10 text-black"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
            {isShowPassword ? (
              <VscEye
                className="text-black"
                size={23}
                onClick={() => setIsShowPassword(false)}
              />
            ) : (
              <VscEyeClosed
                className="text-black"
                size={23}
                onClick={() => setIsShowPassword(true)}
              />
            )}
          </div>
        </div>
      </div>
      <Button teks="Login" type="submit" color="blue" size="medium" />
    </form>
  );
}
