import { model, Schema } from "mongoose";

export const SENTIMENT = {
  POSITIVE: "POSITIVE",
  NEGATIVE: "NEGATIVE",
  NEUTRAL: "NEUTRAL",
};

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    //TODO: update it's reference UserSchema
    type: String,
    required: true,
  },
});

const BlogSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  sentiment: {
    type: String,
    default: SENTIMENT.NEUTRAL,
  },
  genre: {
    type: String,
    required: true,
    default: "politics",
  },
  comments: [CommentSchema],
});

const Blog = model("Blog", BlogSchema);
export default Blog;

// blog{
//     description: "Some description",
//     createdAt: 389348923,
//     userId: 390203,
//     genre: "politics",
//     comments:[
//         {
//             text: "Some comment",
//             userId: 940033,
//         }
//     ]
// }
