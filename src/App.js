import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MainContainer from './pages/MainContainer';

const App = () => {
  return (
    <Router>
      <Switch>
        <MainContainer />
      </Switch>
    </Router>
  );
}

export default App;