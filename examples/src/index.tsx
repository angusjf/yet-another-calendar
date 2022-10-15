import { StrictMode } from "react";
import ReactDom from "react-dom";
// import { Simple } from "./Simple";
import { TwoPage } from "./TwoPage";

ReactDom.render(
  <StrictMode>
    {/* <Simple /> */}
    <TwoPage />
  </StrictMode>,
  document.getElementById("root") as HTMLElement
);
