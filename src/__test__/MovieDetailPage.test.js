import React from 'react';
import Axios from 'axios';
import { render, act, waitForElement, fireEvent } from '@testing-library/react';
import AppContextProvider from '../services/AppContextProvider';
import MovieDetailPage from '../pages/MovieDetailPage';
import { mockFetchAllData } from '../__mocks__/mockFetchData';
import { mockMovieDetail, mockMovieCast } from '../__mocks__/mockResult';


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

describe('Movie Detail Page', () => {
    afterEach(() => {
        // Axios.all.mockClear();
        Axios.get.mockClear();
    });

    it('should render loading', async () => {
        const { getByText } = render(
            <AppContextProvider>
                <MovieDetailPage match={{ params: { id: 1 } }} />
            </AppContextProvider>
        );

        expect(getByText('Loading...')).toBeInTheDocument();

        const node = await waitForElement(() => getByText('Loading...'));
        expect(node).toHaveTextContent('Loading...');
    });


    it('should render movie', async () => {
        await mockFetchAllData([{ data: mockMovieDetail }, { data: mockMovieCast }]);

        const { getByText } = render(
            <AppContextProvider>
                <MovieDetailPage match={{ params: { id: 1 } }} />
            </AppContextProvider>
        );

        const movieDetail = await waitForElement(() => getByText('Test Title'));
        expect(movieDetail).toBeInTheDocument();
    });

    it('should render movie cast', async () => {
        await mockFetchAllData([{ data: mockMovieDetail }, { data: mockMovieCast }]);

        const { getByText } = render(
            <AppContextProvider>
                <MovieDetailPage match={{ params: { id: 1 } }} />
            </AppContextProvider>
        );

        const movieCast = await waitForElement(() => getByText('Test Cast'));
        expect(movieCast).toBeInTheDocument();
    });

    it('should render error when failed to get data', async () => {
        await Axios.all.mockRejectedValueOnce(new Error('error'));

        const { getByText } = render(
            <AppContextProvider>
                <MovieDetailPage match={{ params: { id: 1 } }} />
            </AppContextProvider>
        );

        const error = await waitForElement(() => getByText('Some Error is Occured, Please check your internet connection and refresh the page'));
        expect(error).toBeInTheDocument();
    });

    it('should add movie to favorite and remove it when its already in favorite list', async () => {
        await mockFetchAllData([{ data: mockMovieDetail }, { data: mockMovieCast }]);

        const { getByText } = render(
            <AppContextProvider>
                <MovieDetailPage match={{ params: { id: 1 } }} />
            </AppContextProvider>
        );

        const movieDetail = await waitForElement(() => getByText('Test Title'));
        expect(movieDetail).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(getByText('Add to Favorite'));
        });

        const favoritedButton = await waitForElement(() => getByText('Favorited'));
        expect(favoritedButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(getByText('Favorited'));
        });

        const addToFavoriteButton = await waitForElement(() => getByText('Add to Favorite'));
        expect(addToFavoriteButton).toBeInTheDocument();
    });

});


