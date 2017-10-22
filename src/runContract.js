/* @flow */

export type Input = {
  name: string,
  inputType: "number" | "dollars" | "date",
  value: any,
  max: ?any
};

export type Output = {
  name: string,
  address: string,
  outputType: "source" | "recipient",
  value: number
};

export default function runContract(
  inputs: Array<Input>,
  code: string
): Array<Output> {
  const randoVarName =
    "CONTRACT_RESULT_" +
    Math.random()
      .toString()
      .split(".")[1];
  const args = inputs.map(input => {
    switch (input.inputType) {
      case "date":
        return `new Date(${input.value.getTime()})`;
      case "number":
      case "dollars":
        return input.value;
    }
  });
  eval(`window['${randoVarName}'] = ${code}`);
  return window[randoVarName];
}
