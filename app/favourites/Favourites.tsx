"use client";
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
    <div className="flex flex-col gap-3">
      <p className="p-3">Favourites</p>
      {unqueArray?.map((ele) => (
        <div>
          <ProductCard
            item={ele}
            fetch="movie"
            watchlist={data || [{ id: 0 }]}
            reRender={setReRender}
            favourites={data || [{ id: 0 }]}
          />
        </div>
      ))}
    </div>
  );
};

export default WatchList;
