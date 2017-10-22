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
  const inputObj = {};
  inputs.forEach(input => {
    inputObj[input.name] = input.value;
  });
  const randoVarName =
    "CONTRACT_RESULT_" +
    Math.random()
      .toString()
      .split(".")[1];
  // $FlowFixMe
  return new Function("input", code)(inputObj);
}
