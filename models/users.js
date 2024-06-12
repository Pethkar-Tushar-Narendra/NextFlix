import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    watchlist: { type: [], unique: true },
    favourites: { type: [], unique: true },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;
