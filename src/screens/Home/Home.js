import React from "react";
import Header from "../../components/Header/Header";
import YouTube from "./YouTube/YouTube";
import "../../Styles.css";

export default function Home() {
  return (
    <div className="app">
      <Header />
      <div className="body">
        <YouTube />
      </div>
    </div>
  );
};
