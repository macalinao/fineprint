/* @flow */

import React from "react";

type Input = {
  name: string,
  t: string // type
};

const Input = (input: Input) => {
  return (
    <div>
      <h3>{input.name}</h3>
      <p>Remove</p>
    </div>
  );
};

type Props = {
  inputs: array<Input>,
  addInput: Input => void, // adds an input to the input list
  onRemove: string => void // takes in input name and removes it
};

const Inputs = ({ inputs }: Props) => {
  return (
    <div>
      {inputs.map(input => <Input input={input} />)}
      <div>
        <p>Add input ____</p>
      </div>
    </div>
  );
};
