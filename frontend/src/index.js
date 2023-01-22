import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";
import UserContextProvider from "./context/UserContextProider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ChakraProvider resetCSS={false}>
      <BrowserRouter>
        <CookiesProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </CookiesProvider>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);
