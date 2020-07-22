import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import Axios from 'axios';
import App from '../App';
import { mockFetchData } from '../__mocks__/mockFetchData';
import { mockGenreList, mockMovieList } from '../__mocks__/mockResult';


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

test('render App.js', async () => {
    await mockFetchData(mockGenreList);
    await mockFetchData(mockMovieList);

    const component = render(<App />);

    expect(component).toMatchSnapshot();

    await waitForElement(() => component.getByText('Select Genre'));
    await waitForElement(() => component.getByText('Test Movie List'));
})
