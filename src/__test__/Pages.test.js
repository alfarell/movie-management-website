import React from 'react';
import renderer from 'react-test-renderer';
import HomePage from '../pages/HomePage';
import MainContainer from '../pages/MainContainer';
import FavoritesPage from '../pages/FavoritesPage';
import AppContextProvider, { MovieContext } from '../services/AppContextProvider';
import { configure } from 'enzyme';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import MovieDetailPage from '../pages/MovieDetailPage';
import { BrowserRouter as Router } from 'react-router-dom';


configure({ adapter: new Adapter() });

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

test('render main container', () => {
    const component = render(
        <AppContextProvider>
            <MainContainer />
        </AppContextProvider>
    );

    expect(component).toMatchSnapshot();
});

test('render home page', () => {
    const component = renderer.create(
        <AppContextProvider>
            <HomePage />
        </AppContextProvider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});

test('render favorite page', () => {
    const component = renderer.create(
        <AppContextProvider>
            <FavoritesPage />
        </AppContextProvider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});

test('render movie detail page', () => {
    const component = renderer.create(
        <AppContextProvider>
            <MovieDetailPage match={{ params: { id: 1 } }} />
        </AppContextProvider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});

describe('Favorite Page', () => {
    it('should render favorite movie when data is not null', () => {
        const listFavoriteMovie = [
            {
                id: 1,
                title: 'test',
                poster_path: 'test_poster',
                vote_average: 9
            }
        ]
        const component = render(
            <MovieContext.Provider value={{ listFavoriteMovie }}>
                <Router>
                    <FavoritesPage />
                </Router>
            </MovieContext.Provider>
        );

        expect(component).toMatchSnapshot();
        expect(component.getByTestId('favorite-list')).not.toBeNull();
    })

})
