import React, { useContext } from 'react';
import renderer from 'react-test-renderer';
import AppContextProvider, { MovieContext } from '../services/AppContextProvider';
import DisplayFilters from '../components/DisplayFilters';
import { render, fireEvent } from '@testing-library/react';
import { mockComponent } from 'react-dom/test-utils';

describe('Display Filter Snapshot', () => {
    it('render display filters', () => {
        const component = renderer.create(
            <AppContextProvider>
                <DisplayFilters />
            </AppContextProvider>
        );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });
});

describe('Display Filters functions and render genres', () => {
    const TestComponent = () => {
        const { sortOption } = useContext(MovieContext);

        return (
            <div>
                <p data-testid='sort-by'>{sortOption}</p>
            </div>
        );
    };

    it('should set sort option to popularity', () => {
        const component = render(
            <AppContextProvider>
                <TestComponent />
                <DisplayFilters />
            </AppContextProvider>
        );

        fireEvent.click(component.getByText('Sort By'), onclick);
        fireEvent.click(component.getByText('Popularity'), onclick);

        expect(component.getByTestId('sort-by')).toHaveTextContent('popularity.desc');
    });

    it('should set sort option to latest release', () => {
        const component = render(
            <AppContextProvider>
                <TestComponent />
                <DisplayFilters />
            </AppContextProvider>
        );

        fireEvent.click(component.getByText('Sort By'), onclick);
        fireEvent.click(component.getByText('Latest Release'), onclick);

        expect(component.getByTestId('sort-by')).toHaveTextContent('release_date.desc');
    });

    it('should set sort option to oldest release', async () => {
        const component = render(
            <AppContextProvider>
                <TestComponent />
                <DisplayFilters />
            </AppContextProvider>
        );

        fireEvent.click(component.getByText('Sort By'), onclick);
        fireEvent.click(component.getByText('Oldest Release'), onclick);

        expect(component.getByTestId('sort-by')).toHaveTextContent('release_date.asc');
    });

    it('should render the genres', () => {
        const genreList = [
            {
                id: 1,
                name: 'Test'
            }
        ];

        const component = render(
            <MovieContext.Provider value={{ genreList }}>
                <DisplayFilters />
            </MovieContext.Provider>
        );
        expect(component).toMatchSnapshot();

        fireEvent.click(component.getByText('Select Genre'), onclick);
        expect(component.getByText('Test')).toBeTruthy();
    });
});
