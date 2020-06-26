import React, { createContext, useState, useEffect } from 'react';
import _ from 'loadsh';
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
    }, [selectedGenre, sortOption]);

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
        setPagination(pagination + 1);

        const genre = selectedGenre ? selectedGenre.id : '';
        const sort = sortOption;
        let page = pagination + 1

        Axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_BASE_API_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&with_genres=${genre}&sort_by=${sort}`)
            .then(res => {
                setMovieList([...movieList, ...res.data.results])
            })
            .catch(err => {
                console.log(err);
            });
    }

    const addFavoriteMovie = (favoritedMovie) => {
        let currentMovie = JSON.parse(localStorage.getItem('favorited'));
        let addFavorited;

        if (currentMovie) {
            let check = _.find(currentMovie, favoritedMovie);
            if (check) {
                addFavorited = currentMovie.filter(movie => {
                    return movie.id !== favoritedMovie.id
                });
            } else {
                addFavorited = [...currentMovie, favoritedMovie]
            }
        } else {
            addFavorited = [favoritedMovie];
        }

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
            pagination,
            setPagination,
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
