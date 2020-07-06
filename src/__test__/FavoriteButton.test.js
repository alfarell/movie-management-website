import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import FavoriteButton from '../components/FavoriteButton';

test('should renders favorite button', async () => {
  const { getByTestId } = render(
    <FavoriteButton label='Add to Favorite' />
  );

  expect(getByTestId('favorite-button-test')).toHaveTextContent('Add to Favorite');
});

test('should show label on mouse enter', async () => {
  const { getByTestId } = render(
    <FavoriteButton label='Add to Favorite' hideMode={true} />
  );

  act(() => {
    fireEvent.mouseEnter(getByTestId('favorite-button-test'));
  });

  expect(getByTestId('favorite-button-test')).toHaveTextContent('Add to Favorite');
});

test('should hide label on mouse leave', async () => {
  const { getByTestId } = render(
    <FavoriteButton label='Add to Favorite' hideMode={true} />
  );

  act(() => {
    fireEvent.mouseLeave(getByTestId('favorite-button-test'));
  });

  expect(getByTestId('favorite-button-test')).not.toHaveTextContent('Add to Favorite');
});


describe('Favorite Button Snapshot', () => {
  it('renders favorite button', () => {
    const component = renderer.create(
      <FavoriteButton label='Add to Favorite' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show label when button is hovered', () => {
    const component = renderer.create(
      <FavoriteButton label='Add to Favorite' />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    renderer.act(() => {
      tree.props.onMouseEnter();
    })

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    renderer.act(() => {
      tree.props.onMouseLeave();
    })

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
})

