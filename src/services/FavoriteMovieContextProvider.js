import React, { createContext, useState, useEffect } from 'react';
import _ from 'loadsh';

export const FavoriteMovieContext = createContext();

const FavoriteMovieContextProvider = ({ children }) => {
    const [listFavoriteMovie, setListFavoriteMovie] = useState(() => {
        //to set the default value of list favorited movie from local storage
        const favoritedMovie = localStorage.getItem('favorite-movie');
        return favoritedMovie ? JSON.parse(favoritedMovie) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorite-movie', JSON.stringify(listFavoriteMovie));
    }, [listFavoriteMovie]);

    const addFavoriteMovie = (newFavorite) => {
        const newFavoriteData = {
            id: newFavorite.id,
            title: newFavorite.title,
            poster_path: newFavorite.poster_path,
            vote_average: newFavorite.vote_average
        }

        const checkFavoriteMovie = _.find(listFavoriteMovie, newFavoriteData);

        checkFavoriteMovie
            ? setListFavoriteMovie(listFavoriteMovie.filter((favorited) => {
                return favorited.id !== newFavoriteData.id
            }))
            : setListFavoriteMovie([...listFavoriteMovie, newFavoriteData]);
    };

    return (
        <FavoriteMovieContext.Provider value={{ listFavoriteMovie, addFavoriteMovie }}>
            {children}
        </FavoriteMovieContext.Provider>
    )
};

export default FavoriteMovieContextProvider;
