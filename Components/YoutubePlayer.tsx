"use client";
import YouTube from "react-youtube";

const YoutubePlayer = ({ videoId }: { videoId: string }) => {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
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
    <div className="w-screen h-screen bg-black youtube_container">
      {videoId && (
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onEnd={onEnd}
          onError={onError}
        />
      )}
    </div>
  );
};

export default YoutubePlayer;
