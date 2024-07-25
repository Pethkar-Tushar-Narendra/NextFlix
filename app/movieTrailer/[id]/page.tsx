import YoutubePlayer from "@/Components/YoutubePlayer";

export default function showMovieTrailer({ params }: { params: any }) {
  const { id } = params;

  return (
    <div className="w-full flex flex-wrap h-full">
      <YoutubePlayer videoId={id} />
    </div>
  );
}
