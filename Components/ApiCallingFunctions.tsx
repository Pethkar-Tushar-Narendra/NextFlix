import axios from "axios";

export const addWatchListHandler = async (
  item: any,
  watchList: boolean,
  favourite: boolean,
  add: boolean,
  review: string,
  user: string,
  rating: number
) => {
  try {
    const response = await axios.post("http://localhost:3000/api/list", {
      watchlist: watchList,
      item: { ...item },
      favourite: favourite,
      add: add,
      review,
      user,
      rating,
    });
  } catch (error) {
    console.log(error, "error");
  }
};
