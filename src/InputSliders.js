/* @flow */

import React from "react";
import type { Input } from "./runContract";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type Props = {
  inputs: Array<Input>
};

const renderValue = (input: Input): string => {
  switch (input.inputType) {
    case "dollars":
      return `$${input.value.toFixed(2)}`;
    case "number":
      return input.value.toFixed(2);
    default:
      return input.value.toString();
  }
};

const InputSlider = ({ input }: { input: Input }) => {
  return (
    <div>
      <div className="sliderInfo">
        <p className="label">{input.name}</p>
        <p className="value">{renderValue(input)}</p>
      </div>
      <Slider />
    </div>
  );
};

const InputSliders = ({ inputs }: Props) => {
  return (
    <div className="inputSliders">
      {inputs.map(input => <InputSlider input={input} />)}
    </div>
  );
};

export default InputSliders;
