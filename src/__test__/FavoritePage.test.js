import React from 'react'
import { render } from '@testing-library/react'
import { MovieContext } from '../services/AppContextProvider'
import { BrowserRouter as Router } from 'react-router-dom';
import FavoritesPage from '../pages/FavoritesPage'


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

describe('Favorite Page', () => {
    it('render favorite page when favorite movie list is null', () => {
        const listFavoriteMovie = []
        const componet = render(
            <MovieContext.Provider value={{ listFavoriteMovie }}>
                <Router>
                    <FavoritesPage />
                </Router>
            </MovieContext.Provider>
        );

        expect(componet).toMatchSnapshot();
        expect(componet.getByText('No Favorite Movie')).toBeInTheDocument();
    });

    it('render favorite page if there is favorite movie list', () => {
        const listFavoriteMovie = [
            {
                id: 1,
                title: 'Test Favorite Title',
                poster_path: 'test_poster',
                vote_average: 10
            }
        ]
        const componet = render(
            <MovieContext.Provider value={{ listFavoriteMovie }}>
                <Router>
                    <FavoritesPage />
                </Router>
            </MovieContext.Provider>
        );

        expect(componet).toMatchSnapshot();
        expect(componet.getByText('Test Favorite Title')).toBeInTheDocument();
    });

})
