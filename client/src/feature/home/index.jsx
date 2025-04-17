import React from "react";
import NavigationBar from "../navbar";
import GenrePicker from "./GenrePicker";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <GenrePicker />
      {/* <BlogList /> */}
    </div>
  );
};

export default Home;
