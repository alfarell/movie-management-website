import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Application root', () => {
    it('should render index app', () => {
        const div = document.createElement('div');
        div.id = 'root';
        document.body.appendChild(div);
        require('../index');
        expect(ReactDOM.render).toHaveBeenCalledWith(<App />, div);
    });
});
