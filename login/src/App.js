import React from 'react';
import './App.css';
import { PageSwitch } from "./components/PageSwitch"
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <PageSwitch />
    </GlobalProvider>
  );
}

export default App;
