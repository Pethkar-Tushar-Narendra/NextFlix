"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import YoutubePlayer from "./YoutubePlayer";
import { addWatchListHandler } from "./ApiCallingFunctions";

type data = {
  videos: [];
  favourites: [{ id: number }];
  watchList: [{ id: number }];
};

const Details = ({ id, fetch }: { id: string; fetch: string }) => {
  const [data, setData] = useState<data>({
    videos: [],
    favourites: [{ id: 0 }],
    watchList: [{ id: 0 }],
  });
  const [reRender, setReRender] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/list", {
          params: { fetch, getDetail: true, id },
        });
        setData(response?.data || {});
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, [reRender]);
  const video =
    data?.videos?.length === 1
      ? data?.videos[0]
      : data?.videos?.find((ele) => ele.type === "Trailer")
      ? data?.videos?.find((ele) => ele.type === "Trailer")
      : data?.videos?.find((ele) => ele.type === "Teaser");
  const similarMovies = data?.similarMovies || [];
  const recommendedMovies = data?.recommendedMovies || [];
  const movieReviews = data?.reviews || [];

  const { watchList, favourites, ...item } = data;
  const presentInWatchList = watchList.find((ele) => ele.id === item?.id);
  const presentInFavourites = favourites.find((ele) => ele.id === item?.id);
  return (
    <div className="flex flex-wrap w-full h-full">
      <img
        style={{
          width: "150px",
          height: "100%",
          cursor: "pointer",
        }}
        src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
      />
      <div
        style={{
          width: "calc(100% - 150px)",
          height: "100%",
        }}
        className=""
      >
        <p>
          Title:{" "}
          {fetch === "movie" ? data?.original_title : data?.original_name}
        </p>
        <p>
          Release Date:{" "}
          {fetch === "movie" ? data?.release_date : data?.first_air_date}
        </p>
        <p>
          Synopsis:{" "}
          {data?.overview === "" ? "No synopsis available" : data?.overview}
        </p>
        <p>Ratings: {data?.vote_average}/10</p>
        <div className="flex gap-2 p-2">
          <button
            className="border border-black p-1"
            onClick={async (e) => {
              e.preventDefault();
              await addWatchListHandler(
                { ...item },
                true,
                false,
                !presentInWatchList
              );
              setReRender((prev: boolean) => !prev);
            }}
          >
            {!presentInWatchList ? "Add to" : "Remove from"} Watchlist
          </button>
          <button
            className="border border-black p-1"
            onClick={async (e) => {
              e.preventDefault();
              await addWatchListHandler(
                { ...item },
                false,
                true,
                !presentInFavourites
              );
              setReRender((prev: boolean) => !prev);
            }}
          >
            {!presentInFavourites ? "Add to" : "Remove from"} Favourites
          </button>
        </div>
      </div>
      <img
        style={{
          // width: "150%",
          // height: "100%",
          cursor: "pointer",
        }}
        src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
      />
      {video?.key && (
        <div className="w-full h-full">
          <YoutubePlayer videoId={video?.key} />
        </div>
      )}
      {movieReviews?.length > 0 && (
        <div className="w-full h-full">
          {movieReviews?.map((item, i) => (
            <div key={i}>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      )}
      <p>Similar Movies</p>
      <div className="w-100">
        {similarMovies?.map((item, i) => (
          <div key={i}>
            <ProductCard
              fetch={fetch}
              item={item}
              favourites={data?.favourites || [{ id: 0 }]}
              watchlist={data?.watchList || [{ id: 0 }]}
              reRender={setReRender}
            />
          </div>
        ))}
      </div>
      <p>Recommended Movies</p>
      <div className="w-100">
        {recommendedMovies?.map((item: any, i: number) => (
          <div key={i}>
            <ProductCard
              fetch={fetch}
              item={item}
              favourites={data?.favourites || [{ id: 0 }]}
              watchlist={data?.watchList || [{ id: 0 }]}
              reRender={setReRender}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
