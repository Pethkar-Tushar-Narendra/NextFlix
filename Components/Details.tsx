"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ShowDetails from "./ShowDetails";
import { Router } from "next/router";
import Link from "next/link";

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
  const presentInWatchList = watchList?.find((ele) => ele.id === item?.id);
  const presentInFavourites = favourites?.find((ele) => ele.id === item?.id);
  const screenWidth = screen.width > 1024;

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-gray-900 text-white">
      <NavBar />
      <div className="flex flex-col lg:flex-row lg:justify-between calc-100vh-minus-72px justify-start items-start lg:items-center">
        {screenWidth && (
          <ShowDetails
            data={data}
            fetch={fetch}
            presentInFavourites={presentInFavourites}
            item={item}
            setReRender={setReRender}
            presentInWatchList={presentInWatchList}
          />
        )}
        <Link
          href={
            fetch === "movie"
              ? `/movieTrailer/${video?.key}`
              : `/tvTrailer/${video?.key}`
          }
          className={`w-full lg:w-7/12 h-fit bg-contain bg-no-repeat bg-center bg-start flex items-center justify-center ${
            video?.key && "cursor-pointer"
          } relative lg:overflow-hidden`}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${data?.backdrop_path})`}
            alt=""
            className="transform transition-transform duration-500 hover:scale-110"
          />
          {data?.backdrop_path && video?.key && (
            <svg
              fill="#ffffff"
              className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 60 60"
            >
              <g>
                <path
                  d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
		c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
		C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"
                />
                <path
                  d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
		S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"
                />
              </g>
            </svg>
          )}
        </Link>
        {!screenWidth && (
          <ShowDetails
            data={data}
            fetch={fetch}
            presentInFavourites={presentInFavourites}
            item={item}
            setReRender={setReRender}
            presentInWatchList={presentInWatchList}
          />
        )}
      </div>
      {/* <div className="flex flex-wrap w-full h-full flex-col gap-2 bg-gray-900 text-white">
        <div className="flex gap-2">
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
                className="border border-white p-1"
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
                className="border border-white p-1"
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
        </div>
        {video?.key && (
          <div className="w-full h-full">
            <YoutubePlayer videoId={video?.key} />
          </div>
        )}
        <AddReview />
        {movieReviews?.length > 0 && (
          <div className="flex flex-col w-100 gap-2">
            {movieReviews?.map((item, i) => (
              <ReviewCard
                author={item.author}
                content={item.content}
                rating={item.author_details.rating}
              />
            ))}
          </div>
        )}
        <div>
          <p>Similar Movies</p>
        </div>
        <div className="w-100 flex flex-col gap-1">
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
            <div key={i} className="flex flex-col gap-1">
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
      </div> */}
    </div>
  );
};

export default Details;
