import React from 'react';
import renderer from 'react-test-renderer';
import HomePage from '../pages/HomePage';
import MainContainer from '../pages/MainContainer';
import FavoritesPage from '../pages/FavoritesPage';
import AppContextProvider from '../services/AppContextProvider';
import { render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieDetailPage from '../pages/MovieDetailPage';


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
            split: jest.fn()
        })),
    });
});

test('render main container', () => {
    const component = render(
        <AppContextProvider>
            <MainContainer />
        </AppContextProvider>
    );

    expect(component).toBeTruthy();
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
