import '../App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import {BrowserRouter as Router,} from "react-router-dom";
import Login from "../pages/Login";


function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
