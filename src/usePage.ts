import { Reducer, useCallback, useReducer } from "react";
import { Page, nextPage, previousPage } from "./helpers";

type Action
 = { type: "previous" }
 | { type:  "next" }
 | { type: "setPage", payload: Page };

const pageReducer: Reducer<Page, Action> = (page, action) => {
  switch (action.type) {
    case "next":
      return nextPage(page);
    case "previous":
      return previousPage(page);
    case "setPage":
      return action.payload;
  }
};

interface PageFunctions {
    next: () => void;
    previous: () => void;
    setPage: (page: Page) => void;
}

export const usePage = (initialPage: Page): [Page, PageFunctions] => {
  const [page, dispatch] = useReducer(pageReducer, initialPage);

  const next = useCallback(() => dispatch({ type: "next" }), []);

  const previous = useCallback(() => dispatch({ type: "previous" }), []);

  const setPage = useCallback(
    (newPage: Page) => dispatch({ type: "setPage", payload: newPage }),
    []
  );

  return [page, { next, previous, setPage }];
};
