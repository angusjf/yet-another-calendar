import React from "react";
import ReactDOM from "react-dom/client";
import { DatePicker } from "./examples/DatePicker";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <DatePicker />
  </React.StrictMode>
);
