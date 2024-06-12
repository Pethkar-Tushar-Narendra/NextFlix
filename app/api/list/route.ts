import {
  getAll,
  getByGenreId,
  getByTitle,
  getDetails,
  getGenres,
  getMovieReviews,
  getMoviesByKeywordId,
  getRecommendedMovies,
  getSimilarMovies,
  getTopRated,
  getTrending,
  getUpcomingMovies,
  getVideos,
} from "@/Components/Functions";
import connectMongoDB from "@/libs/mongodb";
import Users from "@/models/users";
import RatingAndReviews from "@/models/rating";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// Get list will provide list of movies by checking request data
export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  let watchList = [];
  let favourites = [];
  let reviews = [];
  try {
    const session = await getServerSession(authOptions);
    await connectMongoDB();
    const userFromDataBase = await Users.findOne({
      userName: session?.user?.name,
    });
    watchList = [...userFromDataBase?.watchlist];
    favourites = [...userFromDataBase?.favourites];
  } catch (error) {
    return NextResponse.json({ message: "invalid user" }, { status: 201 });
  }
  try {
    const getReviewsAndRatings = await RatingAndReviews.find({});
    console.log(getReviewsAndRatings, "getReviewsAndRatings");
  } catch (error) {
    return NextResponse.json({ message: "invalid user" }, { status: 201 });
  }
  const fetch = searchParams.get("fetch");
  const page = searchParams.get("page") || "1";
  const getGenre = searchParams.get("getGenre");
  const getDetail = searchParams.get("getDetail");
  const watchListParam = searchParams.get("watchList");
  const favouritesParam = searchParams.get("favourites");
  const id = searchParams.get("id");
  if (watchListParam) {
    try {
      return NextResponse.json({ watchList }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 201 });
    }
  }
  if (favouritesParam) {
    try {
      return NextResponse.json({ favourites }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 201 });
    }
  }
  if (!searchParams.keys().next().value || !fetch) {
    try {
      return NextResponse.json({ message: "invalid query" }, { status: 201 });
    } catch (e) {
      return NextResponse.json({ error: e }, { status: 201 });
    }
  } else {
    if (Array.from(searchParams.entries()).length === 2) {
      try {
        const response = await getAll(
          searchParams.get("fetch") || "movie",
          page
        );
        return NextResponse.json(
          { ...response?.data, watchList, favourites },
          { status: 201 }
        );
      } catch (e) {
        return NextResponse.json({ error: e }, { status: 201 });
      }
    }
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) {
      if (category === "trending") {
        try {
          const response = await getTrending(fetch, page);
          return NextResponse.json(
            { ...response?.data, watchList, favourites },
            { status: 201 }
          );
        } catch (e) {
          return NextResponse.json({ error: e }, { status: 201 });
        }
      }
      if (category === "top-rated") {
        try {
          const response = await getTopRated(fetch, page);
          return NextResponse.json(
            { ...response?.data, watchList, favourites },
            { status: 201 }
          );
        } catch (e) {
          return NextResponse.json({ error: e }, { status: 201 });
        }
      }
      if (category === "upcoming") {
        try {
          const response = await getUpcomingMovies(page);
          return NextResponse.json(
            { ...response?.data, watchList, favourites },
            { status: 201 }
          );
        } catch (e) {
          return NextResponse.json({ error: e }, { status: 201 });
        }
      }
    } else if (search) {
      if (search === "title") {
        try {
          const response = await getByTitle(
            fetch || "movie",
            searchParams.get("query") || ""
          );
          return NextResponse.json(
            { ...response?.data, watchList, favourites },
            { status: 201 }
          );
        } catch (e) {
          return NextResponse.json({ error: e }, { status: 201 });
        }
      }
      if (search === "genres") {
        try {
          const response = await getByGenreId(
            searchParams.get("genre_id") || "",
            fetch,
            page
          );
          return NextResponse.json(
            { ...response?.data, watchList, favourites },
            { status: 201 }
          );
        } catch (e) {
          return NextResponse.json({ error: e }, { status: 201 });
        }
      }
      if (search === "keywords") {
        try {
          const response = await getMoviesByKeywordId(
            searchParams.get("keywordId") || ""
          );
          return NextResponse.json(
            { ...response?.data, watchList, favourites },
            { status: 201 }
          );
        } catch (e) {
          return NextResponse.json({ error: e }, { status: 201 });
        }
      }
    } else if (getGenre && fetch && page) {
      try {
        const response = await getGenres(fetch, page);
        return NextResponse.json(
          { ...response?.data, watchList, favourites },
          { status: 201 }
        );
      } catch (e) {
        return NextResponse.json({ error: e }, { status: 201 });
      }
    } else if (getDetail && fetch && id) {
      try {
        const response = await getDetails(fetch, id);
        const videoResponse = await getVideos(fetch, id);
        const similarMovies = await getSimilarMovies(fetch, id);
        const recommendedMovies = await getRecommendedMovies(fetch, id);
        const reviews = (await getMovieReviews(fetch, id)) || [];
        return NextResponse.json(
          {
            ...response?.data,
            videos: [...videoResponse?.data?.results],
            similarMovies: [...similarMovies?.data?.results],
            recommendedMovies: [...recommendedMovies?.data?.results],
            reviews: [...reviews?.data?.results],
            watchList,
            favourites,
          },
          { status: 201 }
        );
      } catch (e) {
        return NextResponse.json({ error: e }, { status: 201 });
      }
    }
  }
  return NextResponse.json({ message: "invalid request" }, { status: 201 });
}

export async function POST(request: Request) {
  try {
    const { item, watchlist, favourite, add, review, user, rating } =
      await request.json();
    const session = await getServerSession(authOptions);
    await connectMongoDB();
    if (review) {
      const addReview = await RatingAndReviews.insertMany({
        user,
        rating,
        review,
      });
      return NextResponse.json(addReview, { status: 201 });
    }
    const updatedDocument = await Users.findOneAndUpdate(
      {
        userName: session?.user?.name,
      },
      add
        ? {
            $push: watchlist
              ? { watchlist: { ...item } }
              : favourite
              ? {
                  favourites: { ...item },
                }
              : {},
          }
        : {
            $pull: watchlist
              ? { watchlist: { id: item.id } }
              : favourite
              ? {
                  favourites: { id: item.id },
                }
              : {},
          },
      {
        new: true,
      }
    );
    if (!updatedDocument) {
      throw new Error("Cannot find user.");
    }
    return NextResponse.json(updatedDocument, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 201 });
  }
}
