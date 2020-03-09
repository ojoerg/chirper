import React from "react";
import { Header } from "./components/Header";
import { Feed } from "./components/Feed";
import { GlobalProvider } from "./context/GlobalState";

import "./App.css";

function App() {

  return (
    <GlobalProvider>
      <Header />
      <Feed />
    </GlobalProvider>
  );
}

export default App;
