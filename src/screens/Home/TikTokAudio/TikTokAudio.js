import React from "react";
import Icon from "./Icon/Icon";
import Title from "./Title/Title";
import Input from "./Input/Input";
import Button from "./Button/Button";
import "../../../Styles.css";

export default function TikTokAudio() {
  return (
    <div className="bodyContainer">
      <div
        className="titleContainer">
        <Icon />
        <Title />
      </div>
      <Input />
      <Button />
    </div>
  );
};
