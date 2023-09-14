import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.scss";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import './i18n';
import store from './redux/store';
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
  <Suspense>
    <CssBaseline />
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>      
    </ThemeProvider>
  </Suspense>   
  </>  
);
