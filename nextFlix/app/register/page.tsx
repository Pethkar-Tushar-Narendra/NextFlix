"use client";
import InputFields from "@/Components/InputFields";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  console.log(userName, password, "username,password");

  const submitHandler = async () => {
    const res = await axios.post("/api/auth/register/", {
      name: "Tushar",
      lastName: "Pethkar",
    });
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

export default Register;
