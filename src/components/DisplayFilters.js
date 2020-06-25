import React, { useContext } from 'react';
import { Menu, Tag } from 'antd';
import { MovieContext } from '../services/AppContextProvider';

const DisplayFilters = () => {
    const { genreList, selectedGenre, setSelectedGenre, setMovieList } = useContext(MovieContext);

    return (
        <Menu mode='inline'>
            <div>
                {
                    selectedGenre
                        ? <Tag color='red' closable onClose={() => setSelectedGenre(null)}>{selectedGenre.name}</Tag>
                        : ''
                }
            </div>
            <Menu.SubMenu title={<span>Select Genre</span>} disabled={genreList.length === 0 ? true : false} >
                {genreList.map(genre => {
                    return (
                        <Menu.Item key={genre.id} onClick={() => {
                            setMovieList([]);
                            setSelectedGenre({ id: genre.id, name: genre.name });
                        }}>{genre.name}</Menu.Item>
                    )
                })}
            </Menu.SubMenu>
        </Menu>
    );
};

export default DisplayFilters;
