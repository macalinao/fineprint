/* @flow */

import React, { Component } from "react";
import logo from "./logo.svg";
import CodeEditor from "./CodeEditor";
import Inputs from "./Inputs";
import InputSliders from "./InputSliders";
import "./App.css";
import runContract from "./runContract";

type Props = {};

type State = {
  code: string
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      code: ""
    };
  }

  inputs = [
    {
      name: "price",
      inputType: "dollars",
      value: 50.5
    },
    {
      name: "quantity",
      inputType: "number",
      value: 100
    }
  ];

  fetchContractResults = () => {
    return runContract([], this.state.code);
  };

  onCodeChange = (code: string) => {
    this.setState({
      code: code
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <CodeEditor code={this.state.code} onChange={this.onCodeChange} />
          <Inputs inputs={[]} />
          <InputSliders inputs={this.inputs} />
        </p>
      </div>
    );
  }
}

export default App;
