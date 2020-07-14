import React from 'react';
import renderer from 'react-test-renderer';
import CardContent from '../components/MainComponent/CardContent';
import AppContextProvider from '../services/AppContextProvider';
import { BrowserRouter as Router } from 'react-router-dom';

const dummyData = {
    id: 1,
    title: 'test',
    poster_path: 'test_poster',
    vote_average: 9
}

test('should show favorite button when mouse enter the display movie card', () => {
    const component = renderer.create(
        <AppContextProvider>
            <Router>
                <CardContent data={dummyData} />
            </Router>
        </AppContextProvider>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    renderer.act(() => {
        tree.props.onMouseEnter();
    })

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('should show favorite button when mouse leave the display movie card', () => {
    const component = renderer.create(
        <AppContextProvider>
            <Router>
                <CardContent data={dummyData} />
            </Router>
        </AppContextProvider>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    renderer.act(() => {
        tree.props.onMouseLeave();
    })

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


