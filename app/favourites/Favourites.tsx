"use client";
import NavBar from "@/Components/NavBar";
import ProductCard from "@/Components/ProductCard";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const WatchList = () => {
  const [data, setData] = useState<[{ id: number }]>([{ id: 0 }]);
  const [reRender, setReRender] = useState<boolean>(true);

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/list", {
          params: { favourites: true },
        });
        setData([...response?.data?.favourites]);
      } catch (error) {}
    };
    postData();
  }, [reRender]);

  const unqueArray = [
    ...new Map(
      data.filter((item) => item.id).map((item) => [item.id, item])
    ).values(),
  ];

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-gray-900 text-white">
      <NavBar />
      <div className=" p-4 w-full text-white flex flex-wrap justify-center items-center gap-2 mt-2">
        <p className="w-full">Favourites</p>
        {unqueArray?.map(
          (
            item: {
              id: string;
            },
            i: number
          ) => (
            <Link
              href={`/${fetch}/${item.id}`}
              className="bg-gray-700 shadow-lg rounded p-4 flex gap-2 flex-col w-full md:w-fit justify-center items-center text-white"
            >
              <ProductCard
                fetch={"movie"}
                item={item}
                reRender={setReRender}
                key={i}
                watchlist={data?.watchList || []}
                favourites={[...unqueArray] || []}
              />
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default WatchList;
