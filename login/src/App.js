import React from 'react';
import './App.css';
import { Welcome } from "./components/Welcome";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { GlobalProvider } from "./context/GlobalState";


function App() {
  return (
    <GlobalProvider>
      <Welcome />
      <Register />
      <Login />
    </GlobalProvider>
  );
}

export default App;
