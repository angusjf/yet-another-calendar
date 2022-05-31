import React from "react";
import ReactDOM from "react-dom/client";
import { Simple } from "./examples/Simple";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Simple />
  </React.StrictMode>
);
