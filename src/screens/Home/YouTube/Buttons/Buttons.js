import React from "react";
import Video from "./Video/Video";
import Music from "./Music/Music";
import "../../../../Styles.css";

export default function Buttons() {
  return (
    <div className="buttonsContainer">
      <Video />
      <Music />
    </div>
  );
};
