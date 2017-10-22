/* @flow */

import type { Input, Output } from "./runContract";
import React, { Component } from "react";
import logo from "./logo.svg";
import CodeEditor from "./CodeEditor";
import Inputs from "./Inputs";
import InputSliders from "./InputSliders";
import "./App.css";
import runContract from "./runContract";
import Navbar from "./Navbar";
import Participants from "./Participants";

type Props = {};

type State = {
  code: string,
  inputs: Array<Input>,
  outputs: Array<Output>,
  selectedTab: string,
  selectedEditorTab: string
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

const DEFAULT_OUTPUTS = [
  {
    name: "Tejas Manohar",
    address: "1btasdklsajdksajdksa",
    outputType: "recipient",
    value: 1000
  },
  {
    name: "Bitcoin Buddies",
    address: "1btasdklsajdksajdksa",
    outputType: "recipient",
    value: 9000
  },
  {
    name: "Segment Inc",
    address: "1btasdklsajdksajdksa",
    outputType: "source",
    value: 10000
  }
];

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      code: DEFAULT_CONTRACT,
      inputs: DEFAULT_INPUTS,
      outputs: DEFAULT_OUTPUTS,
      selectedTab: "simulation",
      selectedEditorTab: "variables"
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
      max: 0.0
    };
    this.forceUpdate();
  };

  onRemove = (name: string) => {
    this.setState({
      inputs: this.state.inputs.filter((i: Input) => {
        return i.name != name;
      })
    });
  };

  setTab = (tab: string) => {
    this.setState({
      selectedTab: tab
    });
  };

  _renderVariables() {
    return (
      <Inputs
        inputs={this.state.inputs}
        onRemove={this.onRemove}
        addInput={this.addInput}
      />
    );
  }

  _renderParticipants() {
    return <p>participants</p>;
  }

  _setEditorTab = (tab: string) => {
    this.setState({
      selectedEditorTab: tab
    });
  };

  _renderEditorTabSelector() {
    const { selectedEditorTab } = this.state;
    return (
      <div className="selector">
        <a
          onClick={() => this._setEditorTab("variables")}
          className={
            "variables " + selectedEditorTab === "variables" ? "selected" : ""
          }
        >
          Variables
        </a>
        <a
          onClick={() => this._setEditorTab("participants")}
          className={
            "participants " + selectedEditorTab === "participants"
              ? "selected"
              : ""
          }
        >
          Participants
        </a>
      </div>
    );
  }

  _renderEditor() {
    let tab = null;
    if (this.state.selectedEditorTab === "variables") {
      tab = <Inputs inputs={this.state.inputs} />;
    } else {
      tab = <Participants outputs={this.state.outputs} />;
    }
    return (
      <div className="row">
        <div className="editorTab">
          {this._renderEditorTabSelector()}
          {tab}
        </div>
        <CodeEditor code={this.state.code} onChange={this.onCodeChange} />
      </div>
    );
  }

  _renderSimulation() {
    return (
      <div className="row">
        <InputSliders
          inputs={this.state.inputs}
          onNewValue={this.onNewInputValue}
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

  onNewInputValue = (name: string, value: any) => {
    const input = this.state.inputs.find(input => input.name === name);
    if (input) {
      // TODO(igm): handle dates
      input.value = value;
      input.max = value * 2;
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
