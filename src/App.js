/* @flow */

import React, { Component } from "react";
import logo from "./logo.svg";
import CodeEditor from "./CodeEditor";
import Inputs from "./Inputs";
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
        </p>
      </div>
    );
  }
}

export default App;
