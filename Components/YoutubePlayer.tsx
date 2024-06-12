import React from "react";
import YouTube from "react-youtube";

const YoutubePlayer = ({ videoId }: { videoId: string }) => {
  const opts = {
    height: "500px",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  return <YouTube videoId={videoId} opts={opts} />;
};

export default YoutubePlayer;
