import React from "react";
import Header from "../../components/Header/Header";
import YouTube from "./YouTube/YouTube";
import YouTubeMusic from "./YouTubeMusic/YouTubeMusic";
import TikTok from "./TikTok/TikTok";
import Footer from "../../components/Footer/Footer";
import "../../Styles.css";

export default function Home() {
  return (
    <div className="app">
      <Header />
      <div className="body">
        <div className="bodyRow">
          <YouTube />
          <YouTubeMusic />
        </div>
        <div className="bodyRow">
          <TikTok />
        </div>
      </div>
      <Footer />
    </div>
  );
};
