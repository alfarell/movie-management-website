import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MainContainer from './pages/MainContainer';
import AppContextProvider from './services/AppContextProvider';

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <Switch>
          <MainContainer />
        </Switch>
      </Router>
    </AppContextProvider>
  );
}

export default App;