import React from "react";
import renderer from "react-test-renderer";

import { Button } from "..";
import { Provider } from "./../../provider";

describe("<Button />", () => {
  const wrapper = renderer.create(
    <Provider>
      <Button>Click Me</Button>
    </Provider>
  );

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
