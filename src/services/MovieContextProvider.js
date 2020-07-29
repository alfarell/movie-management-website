import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';


export const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
    const [movieList, setMovieList] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [sortOption, setSortOption] = useState('popularity.desc');
    const [pagination, setPagination] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        setMovieList([]);
        setPagination(1);
    }, [selectedGenre, sortOption]);


    useEffect(() => {
        const discovers = {
            genre: selectedGenre?.id,
            sort: sortOption,
            page: pagination
        };

        setLoading(true);
        setError(false);

        fetchMovie(discovers);
    }, [selectedGenre, sortOption, pagination]);


    const fetchMovie = async ({ genre, sort, page }) => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
                params: {
                    api_key: process.env.REACT_APP_BASE_API_KEY,
                    language: 'en-US',
                    include_adult: false,
                    include_video: false,
                    with_genres: genre,
                    sort_by: sort,
                    page: page,
                }
            });

            setMovieList(movies => {
                if (movies.length > 0) return [...movies, ...response.data.results]
                return response.data.results;
            });
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    return (
        <MovieContext.Provider value={{
            movieList,
            selectedGenre,
            setSelectedGenre,
            sortOption,
            setSortOption,
            pagination,
            setPagination,
            loading,
            error,
        }}>
            {children}
        </MovieContext.Provider>
    )
};

export default MovieContextProvider;
