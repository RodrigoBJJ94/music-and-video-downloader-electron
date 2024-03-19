import React from "react";
import LogoIcon from "../../../icons/LogoIcon.svg";
import "./Styles.css";

export default function Bottom() {
  return (
    <div className="headerBottom">
      <div className="logoIconContainer">
        <img
          src={LogoIcon}
          className="logoIcon"
          alt="Logo Icon"
        />
      </div>
    </div>
  );
};
