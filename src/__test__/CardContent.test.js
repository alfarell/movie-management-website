import React, { useContext } from 'react'
import { render, act, fireEvent, waitForElement } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppContextProvider, { MovieContext } from '../services/AppContextProvider'
import CardContent from '../components/MainComponent/CardContent'


describe('Card Content Component', () => {
    const mockData = {
        id: 1,
        title: 'Test',
        poster_path: 'test_poster',
        average_score: 10
    }

    const mockDataWithoutPoster = {
        id: 1,
        title: 'Test',
        poster_path: null,
        average_score: 10
    }

    it('render card content component', async () => {
        const component = render(
            <AppContextProvider>
                <Router>
                    <CardContent data={mockData} />
                </Router>
            </AppContextProvider>
        );
        await waitForElement(() => component.getByText('Test'));

        expect(component).toMatchSnapshot();
    });

    it('render card content component without movie poster path', async () => {
        const component = render(
            <AppContextProvider>
                <Router>
                    <CardContent data={mockDataWithoutPoster} />
                </Router>
            </AppContextProvider>
        );
        await waitForElement(() => component.getByText('Test'));

        expect(component).toMatchSnapshot();
    });

    it('should show favorite button on mouse enter the card component', async () => {
        const { container, getByText, getByTestId } = render(
            <AppContextProvider>
                <Router>
                    <CardContent data={mockData} />
                </Router>
            </AppContextProvider>
        );
        await waitForElement(() => getByText('Test'));

        act(() => {
            fireEvent.mouseEnter(container.firstChild);
        });
        expect(getByTestId('favorite-button-test')).toBeVisible();
    });

    it('should hide favorite button on mouse leave the card component', async () => {
        const { container, getByText, getByTestId } = render(
            <AppContextProvider>
                <Router>
                    <CardContent data={mockData} />
                </Router>
            </AppContextProvider>
        );
        await waitForElement(() => getByText('Test'));

        act(() => {
            fireEvent.mouseEnter(container.firstChild);
        });
        expect(getByTestId('favorite-button-test')).toBeVisible();

        act(() => {
            fireEvent.mouseLeave(container.firstChild);
        });
        expect(getByTestId('favorite-button-test')).not.toBeVisible();
    });

    describe('Test Favorite Button on Card Component', () => {
        const TestComponent = () => {
            const { listFavoriteMovie } = useContext(MovieContext);

            return (
                <div data-testid='favorite-list'>
                    {listFavoriteMovie?.map(data => {
                        return <p key={data.id} data-testid='favorite'>{data.title}</p>
                    })}
                </div>
            )
        }

        it('should add movie to favorite list', async () => {
            const { container, getByTestId } = render(
                <AppContextProvider>
                    <Router>
                        <TestComponent />
                        <CardContent data={mockData} />
                    </Router>
                </AppContextProvider>
            );

            await act(async () => {
                await fireEvent.mouseEnter(container.lastChild);
                await fireEvent.click(getByTestId('favorite-button-test'));
            });

            expect(getByTestId('favorite-list')).toHaveTextContent('Test');
        });

    })

})
