/* @flow */

import React, { Component } from "react";
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

type ISProps = {
  input: Input,
  onSliderChange: (string, number) => void,
  onNewValue: (string, any) => void
};

type ISState = {
  editing: boolean,
  newValue: any
};

class InputSlider extends Component<ISProps, ISState> {
  constructor(props: ISProps) {
    super(props);
    this.state = {
      editing: false,
      newValue: props.input.value
    };
  }

  _startEditing = () => {
    this.setState({
      editing: true,
      newValue: this.props.input.value
    });
  };

  _onEditChange = (elt: any) => {
    this.setState({
      newValue: elt.target.value
    });
  };

  _onEditDone = () => {
    let newValue = this.state.newValue;
    switch (this.props.input.inputType) {
      case "dollars":
      case "number":
        newValue = parseFloat(newValue);
        if (isNaN(newValue)) {
          newValue = null;
        }
    }
    this.setState({
      editing: false
    });
    if (newValue) {
      this.props.onNewValue(this.props.input.name, newValue);
    }
  };

  render() {
    const { input, onSliderChange } = this.props;

    let value = null;
    if (this.state.editing) {
      value = (
        <input
          type="text"
          value={this.state.newValue}
          onBlur={this._onEditDone}
          onChange={this._onEditChange}
        />
      );
    } else {
      value = (
        <p className="value" onClick={this._startEditing}>
          {renderValue(input)}
        </p>
      );
    }

    return (
      <div className="inputSlider">
        <div className="sliderInfo">
          <p className="label">{input.name}</p>
          {value}
        </div>
        <Slider
          value={input.value * 100 / (input.max || 1)}
          onChange={e => onSliderChange(input.name, e)}
        />
      </div>
    );
  }
}

type Props = {
  inputs: Array<Input>,
  onSliderChange: (string, number) => void,
  onNewValue: (string, any) => void
};

const InputSliders = ({ inputs, onNewValue, onSliderChange }: Props) => {
  return (
    <div className="inputSliders">
      {inputs.map(input => (
        <InputSlider
          input={input}
          onSliderChange={onSliderChange}
          onNewValue={onNewValue}
        />
      ))}
    </div>
  );
};

export default InputSliders;
