/* @flow */

import React from "react";
import type { Input } from "./runContract";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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

const InputSlider = ({
  input,
  onSliderChange
}: {
  input: Input,
  onSliderChange: (string, number) => void
}) => {
  return (
    <div>
      <div className="sliderInfo">
        <p className="label">{input.name}</p>
        <p className="value">{renderValue(input)}</p>
      </div>
      <Slider
        defaultValue={input.value * 100 / (input.max || 1)}
        onChange={e => onSliderChange(input.name, e)}
      />
    </div>
  );
};

type Props = {
  inputs: Array<Input>,
  onSliderChange: (string, number) => void
};

const InputSliders = ({ inputs, onSliderChange }: Props) => {
  return (
    <div className="inputSliders">
      {inputs.map(input => (
        <InputSlider input={input} onSliderChange={onSliderChange} />
      ))}
    </div>
  );
};

export default InputSliders;
