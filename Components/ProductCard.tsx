import Link from "next/link";
import React from "react";
import { addWatchListHandler } from "./ApiCallingFunctions";
interface inputProps {
  item: any;
  fetch: string;
  watchlist: [{ id: number }];
  favourites: [{ id: number }];
  reRender: any;
}
const ProductCard: React.FC<inputProps> = ({
  item,
  fetch,
  watchlist,
  favourites,
  reRender,
}) => {
  const presentInWatchList = watchlist?.find((ele) => ele.id === item.id);
  const presentInFavourites = favourites?.find((ele) => ele.id === item.id);
  return (
    <Link
      href={`/${fetch}/${item.id}`}
      style={{
        display: "flex",
        gap: "5px",
      }}
      className="bg-gray-200 p-4 w-400"
    >
      <img
        style={{
          width: "150px",
          height: "100%",
          cursor: "pointer",
        }}
        src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
      />
      <div
        style={{
          width: "calc(100% - 150px)",
          height: "100%",
        }}
      >
        <p>
          Title:{" "}
          {fetch === "movie" ? item?.original_title : item?.original_name}
        </p>
        <p>
          Release Date:{" "}
          {fetch === "movie" ? item?.release_date : item?.first_air_date}
        </p>
        <p>
          Synopsis:{" "}
          {item?.overview === "" ? "No synopsis available" : item?.overview}
        </p>
        <p>Ratings: {item?.vote_average}/10</p>
        <div className="flex gap-2">
          <button
            className="border border-black p-1"
            onClick={async (e) => {
              e.preventDefault();
              await addWatchListHandler(item, true, false, !presentInWatchList);
              reRender((prev: boolean) => !prev);
            }}
          >
            {!presentInWatchList ? "Add to" : "Remove from"} Watchlist
          </button>
          <button
            className="border border-black p-1"
            onClick={async (e) => {
              e.preventDefault();
              await addWatchListHandler(
                item,
                false,
                true,
                !presentInFavourites
              );
              reRender((prev: boolean) => !prev);
            }}
          >
            {!presentInFavourites ? "Add to" : "Remove from"} Favourites
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
