/* @flow */

import React from "react";
import brace from "brace";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/github";

type Props = {
  code: string,
  onChange: string => void
};

const CodeEditor = ({ code, onChange }: Props) => {
  return (
    <AceEditor
      mode="javascript"
      theme="github"
      onChange={onChange}
      value={code}
      name="CONTRACTZ"
      editorProps={{ $blockScrolling: true }}
    />
  );
};

export default CodeEditor;
