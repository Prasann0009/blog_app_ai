import React from "react";
import NavigationBar from "../navbar";
import GenrePicker from "./GenrePicker";
import BlogPosts from "./BlogPosts";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <GenrePicker />
      <BlogPosts />
    </div>
  );
};

export default Home;
