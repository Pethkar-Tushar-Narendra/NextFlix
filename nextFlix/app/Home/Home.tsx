"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
interface movies {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
}
const Home: React.FC = () => {
  const [data, setData] = useState<movies>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  //   const [filter,setFilter] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/list", {
          params: {
            // category: "trending",
            // category: "top-rated",
            // category: "upcoming",
            // search: "title",
            // query: "inception",
            // search: "genres",
            // genre_id: "28",
            // search: "keywords",
            // keywordId: 3074,
          },
        });
        console.log(response.data, "response");
        setData(response.data || []);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <button className={`border border-black bg-red-500`}>trending</button>
        <button className="border border-black">top-rated</button>
        <button className="border border-black">upcoming</button>
      </div>
      <div>
        <p>Page:{data?.page || 0}</p>
        <p>Total Page:{data?.total_pages || 0}</p>
        <p>Total Result:{data?.total_results || 0}</p>
        <div>
          {data?.results?.map((item, i) => (
            <p className="m-2">{item?.original_title || ""}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
