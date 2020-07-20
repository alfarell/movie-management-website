import React from 'react'
import { render, act, fireEvent } from '@testing-library/react';
import FavoriteButton from '../components/ButtonComponent/FavoriteButton';


describe('Favorite Button', () => {
    it('render favorite button', () => {
        const component = render(
            <FavoriteButton label={'Add to Favorite'} hideMode={false} />
        );

        expect(component).toMatchSnapshot();
        expect(component.getByTestId('favorite-button-test')).toHaveTextContent('Add to Favorite');
    });

    it('render favorite button hide mode(hidden label)', () => {
        const component = render(
            <FavoriteButton label={'Add to Favorite'} hideMode={true} />
        );

        expect(component).toMatchSnapshot();
        expect(component.getByTestId('favorite-button-test')).not.toHaveTextContent('Add to Favorite');
    });

    describe('Hover on Favorite Button hidden mode/hidden label', () => {
        it('should show label on mouse enter', () => {
            const { getByTestId, getByText } = render(
                <FavoriteButton label={'Add to Favorite'} hideMode={true} />
            );

            act(() => {
                fireEvent.mouseEnter(getByTestId('favorite-button-test'));
            });

            expect(getByText('Add to Favorite')).toBeInTheDocument();
            expect(getByTestId('favorite-button-test')).toHaveTextContent('Add to Favorite');
        });

        it('should hide label on mouse leave', () => {
            const { getByTestId, getByText } = render(
                <FavoriteButton label={'Add to Favorite'} hideMode={true} />
            );

            act(() => {
                fireEvent.mouseEnter(getByTestId('favorite-button-test'));
            });

            expect(getByText('Add to Favorite')).toBeInTheDocument();
            expect(getByTestId('favorite-button-test')).toHaveTextContent('Add to Favorite');

            act(() => {
                fireEvent.mouseLeave(getByTestId('favorite-button-test'));
            });

            expect(getByTestId('favorite-button-test')).not.toHaveTextContent('Add to Favorite');
        });
    });

});