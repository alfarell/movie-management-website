import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';


export const GenreContext = createContext();

const GenreContextProvider = ({ children }) => {
    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        const getGenreList = async () => {
            const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/genre/list`, {
                params: {
                    api_key: process.env.REACT_APP_BASE_API_KEY,
                    language: 'en-US'
                }
            })

            setGenreList(response.data.genres);
        }

        getGenreList();
    }, []);

    return (
        <GenreContext.Provider value={{ genreList, setGenreList }}>
            {children}
        </GenreContext.Provider>
    )
};

export default GenreContextProvider;
