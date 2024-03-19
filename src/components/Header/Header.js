import React from "react";
import Top from "./Top/Top";
import Bottom from "./Bottom/Bottom";
import "./Styles.css";

export default function Header() {
  return (
    <div className="headerMain">
      <Top />
      <Bottom />
    </div>
  );
};
