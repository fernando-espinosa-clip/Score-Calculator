import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import OptimizationCalculator from "./components/OptimizationCalculator";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <OptimizationCalculator />
    </StyledEngineProvider>
  </React.StrictMode>
);
