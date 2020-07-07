import React from 'react'
import { render } from '@testing-library/react';
import { MovieContext } from '../services/AppContextProvider';
import DisplayMovieList from '../components/DisplayMovieList';
import { BrowserRouter as Router } from 'react-router-dom';

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

test('should render movie list when data is no null', () => {
    const movieList = [
        {
            id: 1,
            title: 'test',
            poster_path: 'test_poster',
            vote_average: 9
        }
    ];
    const isLoading = { loading: false, loader: 'movie-list' };
    const error = { status: false, error: '' };

    const component = render(
        <MovieContext.Provider value={{ movieList, isLoading, error }}>
            <Router>
                <DisplayMovieList />
            </Router>
        </MovieContext.Provider>
    );

    expect(component).toMatchSnapshot();
    expect(component.getByTestId('movie-list')).not.toBeNull();
});

test('should render error message when failed to get movie list', () => {
    const movieList = [];
    const isLoading = { loading: false, loader: 'movie-list' };
    const error = { status: true, error: 'fetch-movie-error' };

    const component = render(
        <MovieContext.Provider value={{ movieList, isLoading, error }}>
            <Router>
                <DisplayMovieList />
            </Router>
        </MovieContext.Provider>
    );

    expect(component).toMatchSnapshot();
    expect(component.getByTestId('movielist-error-message')).toHaveTextContent(
        'Some Error is Occured, Please check your internet connection and refresh the page'
    );
})
