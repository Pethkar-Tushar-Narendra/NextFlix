import { useSession } from "next-auth/react";
import { useState } from "react";
import { addWatchListHandler } from "./ApiCallingFunctions";

const AddReview = () => {
  const [review, setReview] = useState<string>("");
  const { data } = useSession();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addWatchListHandler(
        {},
        false,
        false,
        false,
        review,
        data?.user?.email || null,
        5
      );
    } catch (error) {}
  };
  return (
    <div className="w-full">
      <p>Add Review</p>
      <form className="flex w-full flex-col gap-1">
        <label>Add comment :</label>
        <input
          type="text"
          value={review}
          onChange={(e: any) => setReview(e?.target?.value || "")}
          required
        />
        <p>Add Rating :</p>
        <input type="number" max={10} min={0} required />
        <input type="submit" value={"Add"} style={{ cursor: "pointer" }} />
      </form>
    </div>
  );
};

export default AddReview;
