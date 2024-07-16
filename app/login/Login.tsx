"use client";
import InputFields from "@/Components/InputFields";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showError, setShowError] = useState<string>("");
  const submitHandler = async () => {
    if (userName !== "" && password !== "") {
      try {
        const res = await signIn("credentials", {
          userName,
          password,
        });
        window.location.href = "/";
      } catch (error) {
        console.log(error, "error");
      }
    } else {
      setShowError("Enter Valid Credentials");
    }
  };
  return (
    <div className="bg-cover bg-center h-screen login_page_backDrop flex items-center justify-center">
      <div className="flex flex-col bg-black text-white p-5 gap-2">
        <p className="text-3xl font-bold">Sign In</p>
        <InputFields
          label="Username"
          onChange={(e) => setUserName(e.target.value)}
          type={"string"}
          value={userName}
          autoFocus={true}
        />
        <InputFields
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
          value={password}
        />
        <button
          onClick={submitHandler}
          className="bg-red-500 p-2 rounded-md text-white"
        >
          Sign In
        </button>
        {showError !== "" && <p className="text-red">{showError}</p>}
        <p>
          Dont have account? <Link href={"/register"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
