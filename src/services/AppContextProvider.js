import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';


export const MovieContext = createContext();
export const UserContext = createContext();

const AppContextProvider = ({ children }) => {
    const [movieList, setMovieList] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [sortOption, setSortOption] = useState('popularity.desc')
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
        const discovers = {
            genre: selectedGenre ? selectedGenre.id : '',
            sort: sortOption,
        };

        setPagination(1);
        fetchMovie(discovers);
    }, []);

    const fetchMovie = ({ genre, sort }) => {
        Axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_BASE_API_KEY}&language=en-US&include_adult=false&include_video=false&page=${pagination}&with_genres=${genre}&sort_by=${sort}`)
            .then(res => {
                setMovieList([...res.data.results])
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleLoadMore = () => {
        const genre = selectedGenre ? selectedGenre.id : '';
        const sort = sortOption;

        setPagination(pagination + 1);

        Axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_BASE_API_KEY}&language=en-US&include_adult=false&include_video=false&page=${pagination}&with_genres=${genre}&sort_by=${sort}`)
            .then(res => {
                setMovieList([...movieList, ...res.data.results])
            })
            .catch(err => {
                console.log(err);
            });
    }

    const addFavoriteMovie = (movie) => {
        const currentMovie = JSON.parse(localStorage.getItem('favorited'));
        let addFavorited;

        currentMovie
            ? addFavorited = [...currentMovie, movie]
            : addFavorited = [movie];

        localStorage.setItem('favorited', JSON.stringify(addFavorited));
    }

    return (
        <MovieContext.Provider value={{
            movieList,
            setMovieList,
            genreList,
            setGenreList,
            selectedGenre,
            setSelectedGenre,
            sortOption,
            setSortOption,
            handleLoadMore,
            addFavoriteMovie
        }}>
            <UserContext.Provider value={{ test: 'test' }}>
                {children}
            </UserContext.Provider>
        </MovieContext.Provider>
    );
};

export default AppContextProvider;
