"use client";
import InputFields from "@/Components/InputFields";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";

const Register = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async () => {
    try {
      const res = await axios.post("/api/auth/register/", {
        userName,
        password,
        email,
      });
      if (res) {
        const res = await signIn("credentials", {
          userName,
          password,
        });
        window.location.href = "/";
      }
    } catch (error) {}
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
        type={"password"}
        value={password}
      />
      <InputFields
        label="email"
        onChange={(e) => setEmail(e.target.value)}
        type={"email"}
        value={email}
      />
      <button onClick={submitHandler}>submit</button>
    </div>
  );
};

export default Register;
