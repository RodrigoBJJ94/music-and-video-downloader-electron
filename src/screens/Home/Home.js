import React from "react";
import Header from "../../components/Header/Header";
import YouTubeHD from "./YouTubeHD/YouTubeHD";
import YouTube from "./YouTube/YouTube";
import YouTubeMusic from "./YouTubeMusic/YouTubeMusic";
import TikTokHD from "./TikTokHD/TikTokHD";
import TikTok from "./TikTok/TikTok";
import TikTokAudio from "./TikTokAudio/TikTokAudio";
import "../../Styles.css";

export default function Home() {
  return (
    <div className="app">
      <Header />
      <div className="body">
        <div className="bodyRow">
          <YouTubeHD />
          <YouTube />
          <YouTubeMusic />
        </div>
        <div className="bodyRow">
          <TikTokHD />
          <TikTok />
          <TikTokAudio />
        </div>
      </div>
    </div>
  );
};
