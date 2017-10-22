/* @flow */

import type { Input } from "./runContract";
import React, { Component } from "react";
import logo from "./logo.svg";
import CodeEditor from "./CodeEditor";
import Inputs from "./Inputs";
import InputSliders from "./InputSliders";
import "./App.css";
import runContract from "./runContract";
import Navbar from "./Navbar";

type Props = {};

type State = {
  code: string,
  inputs: Array<Input>,
  selectedTab: string
};

const DEFAULT_CONTRACT = `
  function(price, quantity) {
    var total = price * quantity;
    return [
      {
        name: 'bob',
        value: total * 0.05
      },
      {
        name: 'segment',
        value: total * 0.95
      },
      {
        name: 'client',
        value: -total
      }
    ]
  }
`;

const DEFAULT_INPUTS = [
  {
    name: "price",
    inputType: "dollars",
    value: 50.5,
    max: 101
  },
  {
    name: "quantity",
    inputType: "number",
    value: 100,
    max: 200
  }
];

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      code: DEFAULT_CONTRACT,
      inputs: DEFAULT_INPUTS,
      selectedTab: "simulation"
    };
  }

  fetchContractResults = () => {
    return runContract([], this.state.code);
  };

  onCodeChange = (code: string) => {
    this.setState({
      code: code
    });
  };

  addInput = (input: Input) => {
    this.state.inputs[this.state.inputs.length] = {
      name: "",
      inputType: "number",
      value: 0.0,
      max: -1
    };
    this.forceUpdate();
  }

  onRemove = (name: string) => {
    this.setState({inputs:this.state.inputs.filter((i: Input) => {
      return i.name != name;
    })});
  }

  setTab = (tab: string) => {
    this.setState({
      selectedTab: tab
    });
  };

  _renderEditor() {
    return (
      <div className="row">
        <CodeEditor code={this.state.code} onChange={this.onCodeChange} />
        <Inputs inputs= {this.state.inputs} 
        addInput = {this.addInput}
        onRemove = {this.onRemove}/>
      </div>
    );
  }

  _renderSimulation() {
    return (
      <div className="row">
        <InputSliders
          inputs={this.state.inputs}
          onSliderChange={this.onSliderChange}
        />
        <div className="simulation" />
      </div>
    );
  }

  onSliderChange = (name: string, value: number) => {
    const input = this.state.inputs.find(input => input.name === name);
    if (input && input.max) {
      input.value = value / 100 * input.max;
    }
    // weird force update
    this.setState({
      inputs: this.state.inputs
    });
  };

  render() {
    let view = null;
    if (this.state.selectedTab === "simulation") {
      view = this._renderSimulation();
    } else {
      view = this._renderEditor();
    }
    return (
      <div className="App">
        <div className="container">
          <Navbar selectedTab={this.state.selectedTab} setTab={this.setTab} />
          {view}
        </div>
        <div className="footer">Powered by MasterCard Blockchain</div>
      </div>
    );
  }
}

export default App;
