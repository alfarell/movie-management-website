import React, { createContext, useState, useEffect } from 'react';
import _ from 'loadsh';
import Axios from 'axios';


export const MovieContext = createContext();

const AppContextProvider = ({ children }) => {
    //movie and genre list
    const [movieList, setMovieList] = useState([]);
    const [genreList, setGenreList] = useState([]);

    //settings for fetching movie list with discover
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [sortOption, setSortOption] = useState('popularity.desc');
    const [pagination, setPagination] = useState(1);

    //list favorited movie
    const [listFavoriteMovie, setListFavoriteMovie] = useState(() => {
        //to set the default value of list favorited movie from local storage
        const favoritedMovie = localStorage.getItem('favorite-movie');
        return favoritedMovie ? JSON.parse(favoritedMovie) : [];
    });

    //loading and error state
    const [isLoading, setIsLoading] = useState({ loading: false, loader: '' });
    const [error, setError] = useState({ status: false, error: '' });


    //Genre List
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

    //Fetch movie list and set option to discover the movie list
    useEffect(() => {
        const discovers = {
            genre: selectedGenre ? selectedGenre.id : '',
            sort: sortOption,
        };
        setMovieList([]);
        setPagination(1);
        fetchMovie(discovers);
    }, [selectedGenre, sortOption]);

    //Save the favorited movie list to local storage
    useEffect(() => {
        localStorage.setItem('favorite-movie', JSON.stringify(listFavoriteMovie));
    }, [listFavoriteMovie]);


    //Fetch movie list 
    const fetchMovie = async ({ genre, sort }) => {
        setIsLoading({ loading: true, loader: 'movie-list' });

        try {
            const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
                params: {
                    api_key: process.env.REACT_APP_BASE_API_KEY,
                    language: 'en-US',
                    include_adult: false,
                    include_video: false,
                    with_genres: genre,
                    sort_by: sort
                }
            });

            setMovieList(response.data.results);
            setError({ status: false, error: '' });
        } catch (err) {
            setError({ status: true, error: 'fetch-movie-error' });
        } finally {
            setIsLoading({ loading: false, loader: 'movie-list' });
        }

    };

    //Handle load more movie
    const handleLoadMore = async () => {
        setPagination(pagination + 1);

        const genre = selectedGenre ? selectedGenre.id : '';
        const sort = sortOption;
        const page = pagination + 1;

        setIsLoading({ loading: true, loader: 'load-more-movie' });

        try {
            const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
                params: {
                    api_key: process.env.REACT_APP_BASE_API_KEY,
                    language: 'en-US',
                    include_adult: false,
                    include_video: false,
                    with_genres: genre,
                    sort_by: sort,
                    page: page
                }
            });

            setMovieList([...movieList, ...response.data.results]);
            setError({ status: false, error: '' });
        } catch (err) {
            setError({ status: true, error: 'load-more-movie-error' });
        } finally {
            setIsLoading({ loading: false, loader: 'load-more-movie' });
        }
    };

    //Add favorite Movie
    const addFavoriteMovie = (newFavorite) => {
        let checkFavoriteMovie = _.find(listFavoriteMovie, newFavorite);

        checkFavoriteMovie
            ? setListFavoriteMovie(listFavoriteMovie.filter((favorited) => {
                return favorited.id !== newFavorite.id
            }))
            : setListFavoriteMovie([...listFavoriteMovie, newFavorite]);
    };

    return (
        <MovieContext.Provider value={{
            movieList,
            setMovieList,
            genreList,
            setGenreList,
            selectedGenre,
            listFavoriteMovie,
            setListFavoriteMovie,
            setSelectedGenre,
            sortOption,
            setSortOption,
            pagination,
            setPagination,
            handleLoadMore,
            addFavoriteMovie,
            isLoading,
            error,
        }}>
            {children}
        </MovieContext.Provider>
    );
};

export default AppContextProvider;
