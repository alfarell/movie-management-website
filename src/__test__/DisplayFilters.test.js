import React, { useContext } from 'react';
import Axios from 'axios';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import AppContextProvider, { MovieContext } from '../services/AppContextProvider';
import DisplayFilters from '../components/MainComponent/DisplayFilters';
import { act } from 'react-dom/test-utils';
import { mockFetchData } from '../__mocks__/mockFetchData';
import { mockGenreList } from '../__mocks__/mockResult';


describe('Display Filters Component', () => {
    afterEach(() => {
        Axios.get.mockClear();
    });

    const TestComponent = () => {
        const { sortOption } = useContext(MovieContext);
        return (
            <div>
                <p data-testid='selected-sort-option'>{sortOption}</p>
            </div>
        )
    }

    it('display filter snapshot', async () => {
        await mockFetchData(mockGenreList);

        const component = render(
            <AppContextProvider>
                <DisplayFilters />
            </AppContextProvider>
        );

        expect(component).toMatchSnapshot();

        const genreList = await waitForElement(() => component.getByText('Select Genre'));
        expect(genreList).toBeInTheDocument();
    });

    it('selected sort option should be popularity.desc', async () => {
        await mockFetchData(mockGenreList);

        const { getByText, getByTestId } = render(
            <AppContextProvider>
                <TestComponent />
                <DisplayFilters />
            </AppContextProvider>
        );

        await act(async () => {
            await fireEvent.click(getByText('Sort By'));
            await fireEvent.click(getByText('Popularity'));
        });

        expect(getByTestId('selected-sort-option')).toHaveTextContent('popularity.desc');
    });

    it('selected sort option should be release_date.desc', async () => {
        await mockFetchData(mockGenreList);

        const { getByText, getByTestId } = render(
            <AppContextProvider>
                <TestComponent />
                <DisplayFilters />
            </AppContextProvider>
        );

        await act(async () => {
            await fireEvent.click(getByText('Sort By'));
            await fireEvent.click(getByText('Latest Release'));
        });

        expect(getByTestId('selected-sort-option')).toHaveTextContent('release_date.desc');
    });

    it('selected sort option should be release_date.asc', async () => {
        await mockFetchData(mockGenreList);

        const { getByText, getByTestId } = render(
            <AppContextProvider>
                <TestComponent />
                <DisplayFilters />
            </AppContextProvider>
        );

        await act(async () => {
            await fireEvent.click(getByText('Sort By'));
            await fireEvent.click(getByText('Oldest Release'));
        });

        expect(getByTestId('selected-sort-option')).toHaveTextContent('release_date.asc');
    });

    it('render genre list and show selected genre', async () => {
        await mockFetchData(mockGenreList);

        const { getByText, getByTestId } = render(
            <AppContextProvider>
                <DisplayFilters />
            </AppContextProvider>
        );

        const genreList = await waitForElement(() => getByText('Select Genre'));
        expect(genreList).toBeInTheDocument();

        await act(async () => {
            await fireEvent.click(getByText('Select Genre'));
        });

        const genreFantasy = await waitForElement(() => getByText('Fantasy'));
        const genreSciFi = await waitForElement(() => getByText('Sci-Fi'));

        expect(genreFantasy).toBeInTheDocument();
        expect(genreSciFi).toBeInTheDocument();

        await act(async () => {
            await fireEvent.click(getByText('Fantasy'));
        });

        const selectedGenre = await waitForElement(() => getByTestId('selected-genre'));
        expect(selectedGenre).toHaveTextContent('Fantasy');
    });

    it('should remove selected genre when genre tag is closed', async () => {
        await mockFetchData(mockGenreList);

        const { getByText, getByTestId, container } = render(
            <AppContextProvider>
                <DisplayFilters />
            </AppContextProvider>
        );

        const genreList = await waitForElement(() => getByText('Select Genre'));
        expect(genreList).toBeInTheDocument();

        await act(async () => {
            await fireEvent.click(getByText('Select Genre'));
            await fireEvent.click(getByText('Fantasy'));
        });

        const selectedGenre = await waitForElement(() => getByTestId('selected-genre'));
        expect(selectedGenre).toHaveTextContent('Fantasy');

        act(() => {
            fireEvent.click(getByTestId('selected-genre').lastChild);
        });

        const tagContainer = await waitForElement(() => getByTestId('tag-container'));
        expect(tagContainer).toBeEmpty();
    });

});