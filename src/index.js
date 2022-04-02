import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { UserProvider } from "./context/UserProvider";
import { App, Footer } from "./components";
import "./style/index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <App />
        <Footer classname="footer" />
      </UserProvider>
    </QueryClientProvider>
  </Router>,
  document.getElementById("root")
);
