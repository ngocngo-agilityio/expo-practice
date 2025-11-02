import { Input } from "@/components/input";
import React from "react";
import { render } from "../../test-utils";

describe("<Input />", () => {
  test("renders label and input correctly", () => {
    const { getByText, getByLabelText } = render(
      <Input label="Username" value="" onChangeText={jest.fn()} />
    );

    // Label appears
    expect(getByText("Username")).toBeTruthy();

    // Input accessible via label
    const input = getByLabelText("Username");
    expect(input).toBeTruthy();
  });

  test("matches snapshot", () => {
    const tree = render(
      <Input label="Email" value="john@example.com" onChangeText={jest.fn()} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
