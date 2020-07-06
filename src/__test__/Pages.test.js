import React from 'react';
import renderer from 'react-test-renderer';
import HomePage from '../pages/HomePage';
import MainContainer from '../pages/MainContainer';
import FavoritesPage from '../pages/FavoritesPage';
import AppContextProvider from '../services/AppContextProvider';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../components/NavBar';

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

// test('render main container', () => {
//     const component = renderer.create(
//         <AppContextProvider>
//             <MemoryRouter initialEntries={['/favorites']}>
//                 <MainContainer />
//             </MemoryRouter>
//         </AppContextProvider>
//     );
//     const tree = component.toJSON();

//     expect(tree).toMatchSnapshot();
// });

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
