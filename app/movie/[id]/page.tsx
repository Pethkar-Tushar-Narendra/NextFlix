"use Client";

import Details from "@/Components/Details";

export default function EditTopic({ params }: { params: any }) {
  const { id } = params;

  return (
    <div className="w-full flex flex-wrap h-full">
      <Details id={id} fetch="movie" />
    </div>
  );
}
