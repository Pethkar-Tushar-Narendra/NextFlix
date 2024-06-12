import React from "react";
import Star from "./Star";

interface review {
  rating: number;
  author: string;
  content: string;
}

const ReviewCard: React.FC<review> = ({ rating, author, content }) => {
  return (
    <div className="flex p-2 flex-col bg-gray-200">
      <p>{author}</p>
      <p>{content}</p>
      <div className="flex gap-1">
        {[...Array(10)].map((_, index) => (
          <Star filled={index + 1 <= rating} />
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
