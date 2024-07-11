"use client";

import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../organisms/loading";
import * as Yup from "yup";
import { Formik, Form } from "formik";
export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email tidak boleh kosong"),
    password: Yup.string()
      .required("Password tidak boleh kosong")
      .min(3, "Password minimal 3 karakter"),
  });

  const handleSubmit = async (value: any) => {
    setIsLoading(true);
    setMessage("");
    const res = await signIn("credentials", {
      email: value.email,
      password: value.password,
      redirect: false,
    });

    if (!res?.ok) {
      setMessage("Periksa kembali email dan password anda");
      setIsLoading(false);
      return;
    }
    setMessage("Login Berhasil, anda akan diarahkan ke halaman utama");
    router.push("/home");
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      {message != "" && (
        <div className="w-full mb-3 -mt-2">
          <p className="text-yellow-500">{message}</p>
        </div>
      )}
      <Formik
        initialValues={{ email: "sastra@gmail.com", password: "123" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await handleSubmit(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className="w-full h-max ">
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
                value={values.email}
                onBlur={handleBlur}
                setValue={handleChange}
              />
              {errors.email && touched.email ? (
                <p className="text-red-500 text-[.9rem]  mt-2">
                  {errors.email}
                </p>
              ) : null}
            </div>
            <div className="w-full flex flex-col gap-2 text-[.9rem] mb-5">
              <label htmlFor="password">
                Masukkan Password <span className="text-[crimson]">*</span>
              </label>
              <div className="relative w-full">
                <Input
                  type={isShowPassword ? "text" : "password"}
                  name="password"
                  placeholder="Masukkan Password"
                  size="small"
                  value={values.password}
                  onBlur={handleBlur}
                  setValue={handleChange}
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
              {errors.password && touched.password ? (
                <p className="text-red-500 text-[.9rem]  mt-2">
                  {errors.password}
                </p>
              ) : null}
            </div>

            <Button teks="Login" type="submit" color="blue" size="medium" />
          </Form>
        )}
      </Formik>
    </>
  );
}
