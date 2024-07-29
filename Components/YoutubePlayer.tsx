"use client";
import Link from "next/link";
import YouTube from "react-youtube";

const YoutubePlayer = ({
  videoId,
  searchParams,
}: {
  videoId: string;
  searchParams: string;
}) => {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
    },
  };

  const onReady = (event) => {
    event.target.playVideo();
  };

  const onEnd = (event) => {
    console.log("Video ended");
  };

  const onError = (event) => {
    console.log("An error occurred:", event.data);
  };

  return (
    <div className="w-screen h-screen bg-black youtube_container relative">
      {videoId ? (
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onEnd={onEnd}
          onError={onError}
        />
      ) : (
        <div>Video not fetched error occured</div>
      )}
      <Link
        href={searchParams || "/"}
        className="absolute top-7 right-7 md:top-20 md:right-10 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // width="120"
          // height="120"
          fill="#ffffff"
          className="w-16 h-16"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </Link>
    </div>
  );
};

export default YoutubePlayer;
