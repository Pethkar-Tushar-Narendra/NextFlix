import axios from "axios";
import React, { useState } from "react";
import { addWatchListHandler } from "./ApiCallingFunctions";

const AddReview = () => {
  const [review, setReview] = useState<string>("");
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addWatchListHandler(
        {},
        false,
        false,
        false,
        review,
        "tpethkar@osidigital.com",
        5
      );
    } catch (error) {}
  };
  return (
    <div className="w-full">
      <p>Add Review</p>
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-1">
        <input
          type="text"
          value={review}
          onChange={(e: any) => setReview(e?.target?.value || "")}
          required
        />
        <input type="number" max={10} min={0} required />
        <input type="submit" value={"Add"} />
      </form>
    </div>
  );
};

export default AddReview;
