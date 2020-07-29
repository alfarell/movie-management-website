import React, { useContext } from 'react';
import { Menu, Tag } from 'antd';
import { MovieContext } from '../../services/MovieContextProvider';
import { GenreContext } from '../../services/GenreContextProvider';

const DisplayFilters = () => {
    const { genreList } = useContext(GenreContext);
    const { selectedGenre, sortOption, setSelectedGenre, setSortOption } = useContext(MovieContext);

    return (
        <Menu
            mode='inline'
            selectable
            selectedKeys={[selectedGenre?.id?.toString(), sortOption]}
            defaultOpenKeys={['sort-option']}
        >
            <div data-testid='tag-container'>
                {selectedGenre && (
                    <Tag
                        color='blue'
                        closable
                        onClose={() => setSelectedGenre('')}
                        data-testid='selected-genre'>
                        {selectedGenre.name}
                    </Tag>
                )}
            </div>
            <Menu.SubMenu title='Sort By' key='sort-option'>
                <Menu.Item
                    onClick={() => setSortOption('popularity.desc')}
                    key='popularity.desc'
                >
                    Popularity
                </Menu.Item>
                <Menu.Item
                    onClick={() => setSortOption('release_date.desc')}
                    key='release_date.desc'
                >
                    Latest Release
                </Menu.Item>
                <Menu.Item
                    onClick={() => setSortOption('release_date.asc')}
                    key='release_date.asc'
                >
                    Oldest Release
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title={<span>Select Genre</span>} disabled={genreList.length === 0 ? true : false} >
                {genreList.map(genre => {
                    return (
                        <Menu.Item
                            key={genre.id}
                            onClick={() => setSelectedGenre({ id: genre.id, name: genre.name })}>
                            {genre.name}
                        </Menu.Item>
                    )
                })}
            </Menu.SubMenu>
        </Menu>
    );
};

export default DisplayFilters;
