/* @flow */

import React from "react";
import type { Input } from "./runContract";

const InputComponent = ({
  input,
  onRemove,
  onNameChange,
  onTypeChange
}: {
  input: Input,
  onRemove: string => void,
  onNameChange: (string, string) => void,
  onTypeChange: (string, string) => void
}) => {
  return (
    <div>
      <input className="inputName"
      value={input.name}
      onChange= {(event) => onNameChange(input.name, event.target.value)}/>
      <select className="categorySelect" value={input.inputType} onChange={(event) => onTypeChange(input.name, event.target.value)}>
        {["number", "dollars", "date", "custom"].map((i) => {
          return <option>{i}</option>
        })}
      </select>
      <button className="removeInput" onClick={() => onRemove(input.name)}>Remove</button>
    </div>
  );
};

type Props = {
  inputs: Array<Input>,
  addInput: Input => void, // adds an input to the input list
  onRemove: string => void, // takes in input name and removes it
  onNameChange: (string, string) => void,
  onTypeChange: (string, string) => void
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

  onAddNameChange = (ins: string) => {
    this.setState({
      inputName: ins
    });
  }

  render() {
    return (
      <div>
        <section className="predefined-def">
          <h4>Predefined variables</h4>
          <ul>
            <li>
              <h5>Date</h5>
              <span>date</span>
              <p>Current date of the year</p>
            </li>
          </ul>
        </section>
        <h4>Variables</h4>
        {this.props.inputs.map(input => (
          <InputComponent input={input} onRemove={this.props.onRemove} onNameChange={this.props.onNameChange} onTypeChange={this.props.onTypeChange}/>
        ))}
        <div>
          <p>Add Input:</p>
          <input
            name="nameInput"
            value={this.state.inputName}
            onChange={(event) => this.onAddNameChange(event.target.value)}
          />
          <button onClick={() => this.props.addInput({name: this.state.inputName, inputType: "number", value: 0.0, max: 0.0})}> Add </button>
        </div>
      </div>
    );
  }
}

export default Inputs;
