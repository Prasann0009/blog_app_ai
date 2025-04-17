import React, { useEffect, useState } from "react";
import "./styles/genres.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPostsByGenreId } from "../Home/postMiddleware.js";

const genres = [
  {
    id: "politics",
    title: "Politics",
  },
  {
    id: "technology",
    title: "Technology",
  },
  {
    id: "health",
    title: "Health",
  },
  {
    id: "travel",
    title: "Travel",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "finance",
    title: "Finance",
  },
  {
    id: "entertainment",
    title: "Entertainment",
  },
  {
    id: "sports",
    title: "Sports",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
  },
  {
    id: "science",
    title: "Science",
  },
];

const GenrePicker = () => {
  const { genreId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsByGenreId(genreId));
  }, [genreId, dispatch]);

  return (
    <div className="genres-container">
      {genres.map((genre) => {
        return (
          <Link
            to={`/${genre.id}`}
            className={`link ${genreId === genre.id && "active-genre"}`}
            key={genre.id}
          >
            {genre.title}
          </Link>
        );
      })}
    </div>
  );
};

export default GenrePicker;
