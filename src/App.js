import React from 'react';
import './styles/App.css';
import MainContainer from './pages/MainContainer';
import AppContextProvider from './services/AppContextProvider';

const App = () => {
  return (
    <AppContextProvider>
      <MainContainer />
    </AppContextProvider>
  );
}

export default App;