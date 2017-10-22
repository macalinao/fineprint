/* @flow */

import React from "react";
import type { Input } from "./runContract";

const InputComponent = ({ input, onRemove }: { input: Input, onRemove: any}) => {
  return (
    <div>
      <h3>{input.name}</h3>
      <button onClick = {onRemove}>Remove</button>
    </div>
  );
};

type Props = {
  inputs: Array<Input>,
  addInput: Input => void, // adds an input to the input list
  onRemove: string => void // takes in input name and removes it
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

  onNameChange = (name: string) => {
    this.setState({
      inputName: name
    });
  };

  render() {
    return (
      <div>
        {this.props.inputs.map(input => <InputComponent input={input} onRemove={this.props.onRemove} />)}
        <div>
          <p>Add Input:</p>
          <input 
          name="nameInput"
          value = {this.state.inputName}
          onChange = {this.onNameChange}/> 
          <button onClick = {this.props.addInput}> Add </button>
        </div>
      </div>
    );
  }
}

export default Inputs;
