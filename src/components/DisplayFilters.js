import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const DisplayFilters = () => {
    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BASE_URL}/genre/list?api_key=${process.env.REACT_APP_BASE_API_KEY}`)
            .then(res => {
                setGenreList(res.data.genres);
            })
            .catch(err => {

            });
    }, []);

    return (
        <div>
            {
                genreList.length === 0
                    ? <div>loading...</div>
                    : genreList.map(genre => {
                        return (
                            <div key={genre.id}>{genre.name}</div>
                        )
                    })
            }
        </div>
    );
};

export default DisplayFilters;
