import React from "react";
import { useContextAPI } from "./context/ContextAPI";

export default function Main() {

  const { test } = useContextAPI();

  console.log(test);

  return (
    <div>Music and Video Downloader</div>
  );
};
