import { act, render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import App from "./App";
import { FETCH_POSTS_QUERY } from "./util/graphql";

const mocks = [
  {
    request: {
      query: FETCH_POSTS_QUERY,
      variables: {
        query: {},
      },
    },
    result: {
      data: {
        getPosts: FETCH_POSTS_QUERY,
      },
    },
  },
];

test("it should render", () => {
  let rendered;
  act(() => {
    rendered = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        {App}
      </MockedProvider>,
    );
  });
  expect(rendered).toMatchSnapshot();
});
