"use client";
import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  const logoutHandler = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.log(error, "error");
    }
  };
  return <button onClick={logoutHandler}>Logout</button>;
};

export default Logout;
