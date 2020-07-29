import React from 'react';
import './styles/App.css';
import MainContainer from './pages/MainContainer';
import AppContextProvider from './services/AppContextProvider';
import GenreContextProvider from './services/GenreContextProvider';
import MovieContextProvider from './services/MovieContextProvider';
import FavoriteMovieContextProvider from './services/FavoriteMovieContextProvider';

const App = () => {
  return (
    <AppContextProvider>
      <GenreContextProvider>
        <MovieContextProvider>
          <FavoriteMovieContextProvider>
            <MainContainer />
          </FavoriteMovieContextProvider>
        </MovieContextProvider>
      </GenreContextProvider>
    </AppContextProvider>
  );
}

export default App;