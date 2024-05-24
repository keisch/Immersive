import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <BrowserRouter>
      <React.StrictMode>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </React.StrictMode>
    </BrowserRouter>
  </RecoilRoot>
);
