import React, { useContext, useEffect, useState } from 'react'
import { fireEvent, render } from '@testing-library/react';
import AppContextProvider, { MovieContext } from '../services/AppContextProvider';
import Axios from 'axios';


const TestComponent = () => {
    const {
        movieList,
        setMovieList,
        genreList,
        setGenreList,
        selectedGenre,
        listFavoriteMovie,
        setListFavoriteMovie,
        setSelectedGenre,
        sortOption,
        setSortOption,
        pagination,
        setPagination,
        handleLoadMore,
        addFavoriteMovie,
        isLoading,
        error
    } = useContext(MovieContext);

    return (
        <div>
            <button onClick={() => setMovieList([
                {
                    id: 1,
                    title: 'test',
                    poster_path: 'test_poster',
                    vote_average: 9
                }
            ])}>
                Mock Movie
            </button>
            <button onClick={() => handleLoadMore()}>
                Mock Load More Movie
            </button>
            <div data-testid='movie-list'>
                {movieList?.map(movie => {
                    return (
                        <div key={movie.id} data-testid='movie'>
                            <p>{movie.title}</p>
                            <button onClick={() => addFavoriteMovie(movie)}>Add to Favorite</button>
                        </div>
                    )
                })}
            </div>
            <div data-testid='favorite-list'>
                {listFavoriteMovie?.map(favorite => {
                    return (
                        <div key={favorite.id} data-testid='favorited'>
                            <p>{favorite.title}</p>
                            <button onClick={() => addFavoriteMovie(favorite)}>Remove from Favorite</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// describe('Genre List', () => {
//     it('should set genre list when component is already rendered', () => {
//         const component = render(

//         );
//     });
// });

describe('Favorite Movie', () => {
    const component = render(
        <AppContextProvider>
            <TestComponent />
        </AppContextProvider>
    );

    it('should add movie to favorite movie list', () => {
        fireEvent.click(component.getByText('Mock Movie'), onclick);
        fireEvent.click(component.getByText('Add to Favorite'), onclick);
        expect(component.getByTestId('favorited')).toBeInTheDocument();

        fireEvent.click(component.getByText('Remove from Favorite'), onclick);
        expect(component.getByTestId('favorite-list')).toBeTruthy();
    });
});
