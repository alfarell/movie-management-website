import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Menu } from 'antd';

const DisplayFilters = () => {
    const [genreList, setGenreList] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('Select genre')

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BASE_URL}/genre/list?api_key=${process.env.REACT_APP_BASE_API_KEY}&language=en-US`)
            .then(res => {
                setGenreList(res.data.genres);
            })
            .catch(err => {

            });
    }, []);

    return (
        <Menu mode='inline'>
            <Menu.SubMenu title={<span>{selectedGenre}</span>} disabled={genreList.length === 0 ? true : false} >
                {genreList.map(genre => {
                    return (
                        <Menu.Item key={genre.id} onClick={() => setSelectedGenre('Genre : ' + genre.name)}>{genre.name}</Menu.Item>
                    )
                })}
            </Menu.SubMenu>
        </Menu>
    );
};

export default DisplayFilters;
