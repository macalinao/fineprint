/* @flow */

import React from "react";
import type { Input } from "./runContract";

const InputComponent = ({
  input,
  onRemove,
  onNameChange
}: {
  input: Input,
  onRemove: string => void,
  onNameChange: (string, string) => void
}) => {
  return (
    <div>
      <input value={input.name}
      onChange= {(event) => onNameChange(input.name, event.target.value)}/>
      <button onClick={() => onRemove(input.name)}>Remove</button>
    </div>
  );
};

type Props = {
  inputs: Array<Input>,
  addInput: Input => void, // adds an input to the input list
  onRemove: string => void, // takes in input name and removes it
  onNameChange: (string, string) => void
};

type State = {
  inputName: string
};

class Inputs extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputName: ""
    };
  }

  render() {
    return (
      <div>
        {this.props.inputs.map(input => (
          <InputComponent input={input} onRemove={this.props.onRemove} onNameChange={this.props.onNameChange}/>
        ))}
        <div>
          <p>Add Input:</p>
          <input
            name="nameInput"
            value={this.state.inputName}
          />
          <button onClick={this.props.addInput}> Add </button>
        </div>
      </div>
    );
  }
}

export default Inputs;
