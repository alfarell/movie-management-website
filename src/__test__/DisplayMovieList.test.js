import React from 'react';
import Axios from 'axios';
import { render, waitForElement, act, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContextProvider from '../services/AppContextProvider';
import DisplayMovieList from '../components/MainComponent/DisplayMovieList';
import { mockFetchData } from '../__mocks__/mockFetchData';
import { mockGenreList, mockMovieList, mockLoadMoreMovie } from '../__mocks__/mockResult';


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

describe('Display Movie List', () => {
    afterEach(() => {
        Axios.get.mockClear();
    });

    it('render Display Movie List', async () => {
        await mockFetchData(mockGenreList);
        await mockFetchData(mockMovieList);

        const { container, asFragment, getByText } = render(
            <AppContextProvider>
                <Router>
                    <DisplayMovieList />
                </Router>
            </AppContextProvider>
        );

        expect(asFragment).toMatchSnapshot();
        expect(getByText('Loading...')).toBeInTheDocument();
        expect(container).toHaveTextContent('Loading...');

        const movieList = await waitForElement(() => getByText('Test Movie List'));

        expect(movieList).toBeInTheDocument();
    });

    it('should show more movie list when user load more movie', async () => {
        await mockFetchData(mockGenreList);
        await mockFetchData(mockMovieList);

        const { getByText } = render(
            <AppContextProvider>
                <Router>
                    <DisplayMovieList />
                </Router>
            </AppContextProvider>
        );

        expect(getByText('Loading...')).toBeInTheDocument();

        const movieList = await waitForElement(() => getByText('Test Movie List'));
        expect(movieList).toBeInTheDocument();

        await act(async () => {
            await fireEvent.click(getByText('Load more'));
            await mockFetchData(mockLoadMoreMovie);
        });

        const moreMovieList = await waitForElement(() => getByText('Test Load More Movie'));
        expect(moreMovieList).toBeInTheDocument();
    });

    it('should show error message when failed to get data', async () => {
        await mockFetchData(mockGenreList);
        await Axios.get.mockRejectedValueOnce(new Error('error'));

        const { container, getByText, getByTestId } = render(
            <AppContextProvider>
                <Router>
                    <DisplayMovieList />
                </Router>
            </AppContextProvider>
        );

        expect(getByText('Loading...')).toBeInTheDocument();
        expect(container).toHaveTextContent('Loading...');

        const errorMessage = await waitForElement(() => getByTestId('movielist-error-message'));

        expect(errorMessage).toBeInTheDocument();
    });
});
