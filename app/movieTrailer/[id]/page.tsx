import YoutubePlayer from "@/Components/YoutubePlayer";

export default function showMovieTrailer({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const { id } = params;
  const { movieDetails } = searchParams;

  return (
    <div className="w-full flex flex-wrap h-full">
      <YoutubePlayer videoId={id} searchParams={movieDetails} />
    </div>
  );
}
