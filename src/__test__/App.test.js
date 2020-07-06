import React from 'react'
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';

configure({ adapter: new Adapter() });

test('render App.js', () => {
    const component = render(<App />);

    expect(component).toBeTruthy();
});
