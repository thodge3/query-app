import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Homepage, SecondComponent, Navbar } from "./components";


function App() {
  return (
    <div className={`App`}>
      
      <Router>
      <Navbar />
        <Route path="/" exact component={Homepage} />
        <Route path="/home" component={Homepage} />
        <Route path="/second" component={SecondComponent} />
      </Router>
    </div>
  );
}

export default App;
