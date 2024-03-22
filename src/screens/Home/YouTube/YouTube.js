import React from "react";
import Icon from "./Icon/Icon";
import Title from "./Title/Title";
import Input from "./Input/Input";
import Buttons from "./Buttons/Buttons";

export default function YouTube() {
  return (
    <div className="youTubeContainer">
      <div className="youTubeTitleContainer">
        <Icon />
        <Title />
      </div>
      <Input />
      <Buttons />
    </div>
  );
};
