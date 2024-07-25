"use client";
import ModalPopup from "@/Components/ModalPopup";
import NavBar from "@/Components/NavBar";
import ProductCard from "@/Components/ProductCard";
import SearchBar from "@/Components/SearchBar";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface movies {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
  watchList: [{ id: number }];
  favourites: [{ id: number }];
}

interface genres {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<movies>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
    watchList: [{ id: 0 }],
    favourites: [{ id: 0 }],
  });
  const [genres, setGenres] = useState<genres[]>([]);
  const [fetch, setFetch] = useState<string>("movie");
  const [genreSelected, setGenreSelected] = useState<genres[]>([]);
  const [category, setCategory] = useState("");
  const [reRender, setReRender] = useState(true);
  const [openDetails, setOpenDetails] = useState(false);
  const categorySelected = category === "" ? {} : { category };
  const [page, setPage] = useState<number>(1);
  const [maxPageNo, setMaxPageNo] = useState();
  const genreCallingParams =
    genreSelected?.length > 0
      ? {
          search: "genres",
          genre_id: genreSelected.map((item) => item.id).toString(),
        }
      : {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/list", {
          params: {
            fetch: fetch,
            ...categorySelected,
            page,
            ...genreCallingParams,
          },
        });
        setMaxPageNo(response?.data?.total_pages);
        setData(response.data || []);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, [category, fetch, page, genreSelected, reRender]);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/list", {
          params: { fetch: fetch, getGenre: true, page: 1 },
        });
        setGenres(response?.data?.genres || []);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchGenre();
  }, [fetch]);

  const handlerCategoryChange = (e: string) => {
    if (e !== "upcoming" || fetch === "movie") {
      setCategory(e);
      setGenreSelected([]);
      setPage(1);
    }
  };

  const handlerGenreChange = (e: genres) => {
    setGenreSelected((prev) =>
      prev?.includes(e)
        ? [...prev]?.filter((item) => item?.id !== e.id)
        : [...prev, e]
    );
    setCategory("");
    setPage(1);
  };

  const modalHandler = () => {
    setOpenDetails((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-gray-900 text-white">
      <NavBar />
      <div>
        <div className="flex p-4 justify-between flex-col sm:flex-col md:flex-row gap-2">
          <ModalPopup open={openDetails} onChange={modalHandler} />
          <div className="flex gap-2">
            <button
              className={`border border-white p-2 rounded ${
                fetch === "movie" && "bg-red-500"
              }`}
              onClick={() => {
                setFetch("movie");
                setCategory("");
                setGenreSelected([]);
                setPage(1);
              }}
            >
              Movies
            </button>
            <button
              className={`border border-white p-2 rounded ${
                fetch === "tv" && "bg-red-500"
              }`}
              onClick={() => {
                setFetch("tv");
                setCategory("");
                setGenreSelected([]);
                setPage(1);
              }}
            >
              TV Shows
            </button>
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="flex gap-2">
              <button
                className={`border border-white p-2 rounded ${
                  category === "" && "bg-red-500"
                }`}
                onClick={() => handlerCategoryChange("")}
              >
                All
              </button>
              <button
                className={`border border-white p-2 rounded ${
                  category === "trending" && "bg-red-500"
                }`}
                onClick={() => handlerCategoryChange("trending")}
              >
                trending
              </button>
              <button
                className={`border border-white p-2 rounded ${
                  category === "top-rated" && "bg-red-500"
                }`}
                onClick={() => handlerCategoryChange("top-rated")}
              >
                top-rated
              </button>
              {fetch === "movie" && (
                <button
                  className={`border border-white p-2 rounded ${
                    category === "upcoming" && "bg-red-500"
                  }`}
                  onClick={() => handlerCategoryChange("upcoming")}
                >
                  upcoming
                </button>
              )}
            </div>
            <SearchBar fetch={fetch} />
          </div>
        </div>
        <div className="p-4">
          <p>Search {fetch === "tv" ? "TV Shows" : "Movies"} with Genres:</p>
          <div className="flex flex-wrap gap-2">
            {genres?.map((item, i) => (
              <button
                className={`border border-white rounded p-1 hover:bg-red-500 ${
                  genreSelected?.find((ele) => ele.id === item.id)
                    ? "bg-red-500"
                    : ""
                }`}
                key={i}
                onClick={() => handlerGenreChange(item)}
              >
                {item?.name}
              </button>
            ))}
            {genreSelected.length !== 0 && (
              <button
                className={`border border-white rounded p-1 `}
                onClick={() => setGenreSelected([])}
              >
                Clear Genre
              </button>
            )}
          </div>
        </div>
        <div className="p-4">
          <div className="pb-2 flex gap-2 justify-start items-center">
            <button
              className="border border-white rounded p-1"
              disabled={page === 1}
              onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
            >
              previous page
            </button>
            <p>{page}</p>
            <button
              className="border border-white rounded p-1"
              disabled={!maxPageNo}
              onClick={() =>
                setPage((prev) =>
                  maxPageNo ? (prev < maxPageNo ? prev + 1 : prev) : prev
                )
              }
            >
              next page
            </button>
          </div>
          <div className="gap-4 flex flex-wrap text-black items-center justify-center">
            {data?.results?.map(
              (
                item: {
                  id: string;
                },
                i
              ) => (
                <Link
                  href={`/${fetch}/${item.id}`}
                  className="bg-gray-700 shadow-lg rounded p-4 flex gap-2 flex-col w-full md:w-fit justify-center items-center text-white"
                >
                  <ProductCard
                    fetch={fetch}
                    item={item}
                    reRender={setReRender}
                    key={i}
                    watchlist={data?.watchList || []}
                    favourites={data?.favourites || []}
                  />
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
