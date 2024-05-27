import {
  getMovies,
  getMoviesByGenreId,
  getMoviesByKeywordId,
  getMoviesByTitle,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/Components/Functions";
import { NextResponse } from "next/server";

// Get list will provide list of movies by checking request data
export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  if (!searchParams.keys().next().value) {
    try {
      const response = await getMovies();
      return NextResponse.json({ ...response?.data }, { status: 201 });
    } catch (e) {
      return NextResponse.json({ error: e }, { status: 201 });
    }
  } else {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) {
      if (category === "trending") {
        try {
          const response = await getTrendingMovies();
          return NextResponse.json({ ...response?.data }, { status: 201 });
        } catch (e) {
          return NextResponse.json({ error: e }, { status: 201 });
        }
      }
      if (category === "top-rated") {
        try {
          const response = await getTopRatedMovies();
          return NextResponse.json({ ...response?.data }, { status: 201 });
        } catch (e) {
          return NextResponse.json({ error: e }, { status: 201 });
        }
      }
      if (category === "upcoming") {
        try {
          const response = await getUpcomingMovies();
          return NextResponse.json({ ...response?.data }, { status: 201 });
        } catch (e) {
          return NextResponse.json({ error: e }, { status: 201 });
        }
      }
    } else if (search) {
      if (search === "title") {
        try {
          const response = await getMoviesByTitle(
            searchParams.get("query") || ""
          );
          return NextResponse.json({ ...response?.data }, { status: 201 });
        } catch (e) {
          return NextResponse.json({ error: e }, { status: 201 });
        }
      }
      if (search === "title") {
        try {
          const response = await getMoviesByTitle(
            searchParams.get("query") || ""
          );
          return NextResponse.json({ ...response?.data }, { status: 201 });
        } catch (e) {
          return NextResponse.json({ error: e }, { status: 201 });
        }
      }
      if (search === "genres") {
        try {
          const response = await getMoviesByGenreId(
            searchParams.get("genre_id") || ""
          );
          return NextResponse.json({ ...response?.data }, { status: 201 });
        } catch (e) {
          return NextResponse.json({ error: e }, { status: 201 });
        }
      }
      if (search === "keywords") {
        try {
          const response = await getMoviesByKeywordId(
            searchParams.get("keywordId") || ""
          );
          return NextResponse.json({ ...response?.data }, { status: 201 });
        } catch (e) {
          return NextResponse.json({ error: e }, { status: 201 });
        }
      }
    }
  }
  return NextResponse.json({ message: "invalid request" }, { status: 201 });
}
