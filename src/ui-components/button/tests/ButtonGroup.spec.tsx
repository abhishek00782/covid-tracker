import React from "react";
import renderer from "react-test-renderer";

import { Button } from "..";
import { ButtonGroup } from "../ButtonGroup";
import { Provider } from "../../provider";

describe("<ButtonGroup />", () => {
  const wrapper = renderer.create(
    <Provider>
      <ButtonGroup>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    </Provider>
  );

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
