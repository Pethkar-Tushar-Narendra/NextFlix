import mongoose, { Schema } from "mongoose";

const ratingAndReviewsSchema = new Schema(
  {
    rating: { type: Number },
    user: {
      type: String,
      required: true,
    },
    review: { type: String },
  },
  {
    timestamps: true,
  }
);

const RatingAndReviews =
  mongoose.models.ratingAndReviewsSchema ||
  mongoose.model("RatingAndReviews", ratingAndReviewsSchema);

export default RatingAndReviews;
