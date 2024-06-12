"use client";
import InputFields from "@/Components/InputFields";
import { signIn } from "next-auth/react";
import { useState } from "react";

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const submitHandler = async () => {
    try {
      const res = await signIn("credentials", {
        userName,
        password,
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <div>
      <InputFields
        label="username"
        onChange={(e) => setUserName(e.target.value)}
        type={"string"}
        value={userName}
      />
      <InputFields
        label="password"
        onChange={(e) => setPassword(e.target.value)}
        type={"string"}
        value={password}
      />
      <button onClick={submitHandler}>submit</button>
    </div>
  );
};

export default Login;
