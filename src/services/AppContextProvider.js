import React, { createContext, useState, useEffect } from 'react';
import _ from 'loadsh';
import Axios from 'axios';


export const MovieContext = createContext();

const AppContextProvider = ({ children }) => {
    //movie and genre list
    const [movieList, setMovieList] = useState([]);
    const [genreList, setGenreList] = useState([]);

    //settings for fetching movie list with discover
    const [selectedGenre, setSelectedGenre] = useState({});
    const [sortOption, setSortOption] = useState('popularity.desc');
    const [pagination, setPagination] = useState(1);

    //list favorited movie
    const [listFavoriteMovie, setListFavoriteMovie] = useState(() => {
        //to set the default value of list favorited movie from local storage
        const favoritedMovie = localStorage.getItem('favorite-movie');
        return favoritedMovie ? JSON.parse(favoritedMovie) : [];
    });

    //loading and error state
    const [loading, setLoading] = useState(false);
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
            genre: selectedGenre?.id,
            sort: sortOption,
            page: 1
        };

        setMovieList([]);
        setLoading(true);
        setError({ status: false, error: 'fetch-movie-error' });

        fetchMovie(data => setMovieList(data), {
            loader: 'fetch-movie',
            fetchOption: discovers
        });
    }, [selectedGenre, sortOption]);

    //Load more movie
    useEffect(() => {
        const discovers = {
            genre: selectedGenre?.id,
            sort: sortOption,
            page: pagination
        };

        setLoading(true);
        setError({ status: false, error: 'load-more-movie-error' });

        fetchMovie(data => setMovieList([...movieList, ...data]), {
            loader: 'load-more-movie',
            fetchOption: discovers
        });
    }, [pagination]);

    //Save the favorited movie list to local storage
    useEffect(() => {
        localStorage.setItem('favorite-movie', JSON.stringify(listFavoriteMovie));
    }, [listFavoriteMovie]);


    //Fetch movie list 
    const fetchMovie = async (setData, { loader, fetchOption: { genre, sort, page } }) => {
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

            setData(response.data.results);

        } catch (err) {
            setError({ status: true, error: loader + '-error' });
        } finally {
            setLoading(false);
        }

    };

    //Add favorite Movie
    const addFavoriteMovie = (newFavorite) => {
        const newFavoriteData = {
            id: newFavorite.id,
            title: newFavorite.title,
            poster_path: newFavorite.poster_path,
            vote_average: newFavorite.vote_average
        }

        const checkFavoriteMovie = _.find(listFavoriteMovie, newFavoriteData);

        checkFavoriteMovie
            ? setListFavoriteMovie(listFavoriteMovie.filter((favorited) => {
                return favorited.id !== newFavoriteData.id
            }))
            : setListFavoriteMovie([...listFavoriteMovie, newFavoriteData]);
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
            addFavoriteMovie,
            loading,
            error,
        }}>
            {children}
        </MovieContext.Provider>
    );
};

export default AppContextProvider;
