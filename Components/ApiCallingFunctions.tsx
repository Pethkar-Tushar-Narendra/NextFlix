import axios from "axios";

export const addWatchListHandler = async (
  item: any,
  watchList: boolean,
  favourite: boolean,
  add: boolean,
  review: string,
  user: string,
  rating: number,
  movieId: string,
  fetch: string
) => {
  try {
    const response = await axios.post("/api/list", {
      watchlist: watchList,
      item: { ...item },
      favourite: favourite,
      add: add,
      review,
      user,
      rating,
      movieId,
      fetch,
    });
  } catch (error) {
    console.log(error, "error");
  }
};
