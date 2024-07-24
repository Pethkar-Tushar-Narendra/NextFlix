"use client";
import NavBar from "@/Components/NavBar";
import ProductCard from "@/Components/ProductCard";
import axios from "axios";
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

  const unqueArray = [...new Map(data.map((item) => [item.id, item])).values()];

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-gray-900 text-white">
      <NavBar />
      <div className="p-4">
        <p className="mb-4">Favourites</p>
        <div className="flex gap-2 flex-wrap justify-center items-center">
          {unqueArray?.map((ele, key) => (
            <ProductCard
              item={ele}
              fetch="movie"
              watchlist={data || [{ id: 0 }]}
              reRender={setReRender}
              favourites={data || [{ id: 0 }]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchList;
