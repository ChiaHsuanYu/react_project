import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import routes_data from './router';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <nav>
            {
              routes_data.map((data) => (
                <NavLink className="App-link" to={data.path}>{data.title}</NavLink>
              ))
            }
          </nav>
          <Routes>
            {
              routes_data.map((data) => (
                <Route path={data.path} element={data.component} />
              ))
            }
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;

