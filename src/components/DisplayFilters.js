import React, { useContext } from 'react';
import { Menu, Tag } from 'antd';
import { MovieContext } from '../services/AppContextProvider';

const DisplayFilters = () => {
    const { genreList, selectedGenre, setSelectedGenre, setMovieList, setSortOption } = useContext(MovieContext);

    return (
        <Menu mode='inline'>
            <div>
                {
                    selectedGenre
                        ? <Tag color='blue' closable onClose={() => setSelectedGenre(null)}>{selectedGenre.name}</Tag>
                        : null
                }
            </div>
            <Menu.SubMenu title='Sort By'>
                <Menu.Item onClick={() => setSortOption('popularity.desc')}>Popularity</Menu.Item>
                <Menu.Item onClick={() => setSortOption('release_date.desc')}>Latest Release</Menu.Item>
                <Menu.Item onClick={() => setSortOption('release_date.asc')}>Oldest Release</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title={<span>Select Genre</span>} disabled={genreList.length === 0 ? true : false} >
                {genreList.map(genre => {
                    return (
                        <Menu.Item
                            key={genre.id}
                            onClick={() => {
                                setMovieList([]);
                                setSelectedGenre({ id: genre.id, name: genre.name });
                            }}>
                            {genre.name}
                        </Menu.Item>
                    )
                })}
            </Menu.SubMenu>
        </Menu>
    );
};

export default DisplayFilters;
