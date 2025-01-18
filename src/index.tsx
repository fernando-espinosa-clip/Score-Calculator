import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import Demo from "./Demo";
import OptimizationCalculator from "./OptimizationCalculator";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Demo />
      <OptimizationCalculator />
    </StyledEngineProvider>
  </React.StrictMode>
);
