import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';


export const MovieContext = createContext();
export const UserContext = createContext();
const AppContextProvider = ({ children }) => {
    const [movieList, setMovieList] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [pagination, setPagination] = useState(1);

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BASE_URL}/genre/list?api_key=${process.env.REACT_APP_BASE_API_KEY}&language=en-US`)
            .then(res => {
                setGenreList(res.data.genres);
            })
            .catch(err => {
                console.log(err);
            });
    }, [genreList]);

    useEffect(() => {
        if (selectedGenre) {
            fetchMovie(selectedGenre.id);
        } else {
            fetchMovie();
        }
    }, [selectedGenre]);

    // useEffect(() => {
    //     if (selectedGenre) {
    //         Axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_BASE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${selectedGenre.id}&page=${pagination}`)
    //             .then(res => {
    //                 console.log(res)
    //                 setMovieList([...res.data.results])
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //     }
    // }, [selectedGenre]);

    const fetchMovie = (genre = '') => {
        Axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_BASE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pagination}&with_genres=${genre}`)
            .then(res => {
                setMovieList([...res.data.results])
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <MovieContext.Provider value={{ movieList, setMovieList, genreList, setGenreList, selectedGenre, setSelectedGenre }}>
            <UserContext.Provider value={{ test: 'test' }}>
                {children}
            </UserContext.Provider>
        </MovieContext.Provider>
    );
};

export default AppContextProvider;
