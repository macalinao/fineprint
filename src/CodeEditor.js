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

export const CodeEditor2 = (props: Props) => {
  return (
    <div className="ce2">
      <div className="statement">
        <p>
          <span>Let</span> <button>total</button> <button>=</button>{" "}
          <button>price</button>
          <button>*</button>
          <button>quantity</button>
        </p>
      </div>
      <div className="statement">
        <p>
          <span>If</span> <button>quantity</button> <button>&gt;</button>{" "}
          <button>100</button>
        </p>
        <p>
          <span>Then</span> <button>total</button>
          <button>*</button> <button>0.10</button>&rArr;{" "}
          <button>Andrew Tian</button>
        </p>
        <p>
          <span>Then</span> <button>total</button>
          <button>*</button> <button>0.90</button>&rArr;{" "}
          <button>Segment Inc</button>
        </p>
      </div>
      <div className="statement">
        <p>
          <span>If</span> <button>quantity</button> <button>&gt;</button>{" "}
          <button>50</button>
        </p>
        <p>
          <span>Then</span> <button>total</button>
          <button>*</button> <button>0.05</button>&rArr;{" "}
          <button>Andrew Tian</button>
        </p>
        <p>
          <span>Then</span> <button>total</button>
          <button>*</button> <button>0.95</button>&rArr;{" "}
          <button>Segment Inc</button>
        </p>
      </div>
      <div className="statement">
        <p>
          <span>If</span> <button>quantity</button> <button>&gt;</button>{" "}
          <button>10</button>
        </p>
        <p>
          <span>Then</span> <button>total</button>
          <button>*</button> <button>0.02</button>&rArr;{" "}
          <button>Andrew Tian</button>
        </p>
        <p>
          <span>Then</span> <button>total</button>
          <button>*</button> <button>0.98</button>&rArr;{" "}
          <button>Segment Inc</button>
        </p>
      </div>
      <div className="statement">
        <p>
          <span>Take</span> <button>total</button>
          &lArr; <button>R.C. Cola</button>
        </p>
      </div>
      <button className="add-btn">+ Add Statement</button>
    </div>
  );
};

export const CodeEditor = ({ code, onChange }: Props) => {
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
