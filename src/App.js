import React from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

//components
import Nav from './components/nav/Nav';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Nav /> */}
        {routes}
      </div>
    </BrowserRouter>
  );
}

export default App;
