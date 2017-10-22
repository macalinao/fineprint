/* @flow */

import React from "react";
import type { Input } from "./runContract";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type Props = {
  inputs: Array<Input>
};

const InputSlider = ({ input }: { input: Input }) => {
  return (
    <div>
      <p>{input.name}</p>
      <Slider />
    </div>
  );
};

const InputSliders = ({ inputs }: Props) => {
  return <div>{inputs.map(input => <InputSlider input={input} />)}</div>;
};

export default InputSliders;
