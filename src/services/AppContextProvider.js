import React, { createContext, useState, useEffect } from 'react';
import _ from 'loadsh';
import Axios from 'axios';


export const MovieContext = createContext();

const AppContextProvider = ({ children }) => {
    //useState of movie and genre list
    const [movieList, setMovieList] = useState([]);
    const [genreList, setGenreList] = useState([]);
    //useState of settings for fetching movie list with discover
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [sortOption, setSortOption] = useState('popularity.desc');
    const [pagination, setPagination] = useState(1);
    //useState of list favorited movie
    const [listFavoriteMovie, setListFavoriteMovie] = useState([], () => {
        //to set the default value of list favorited movie
        const favoritedMovie = JSON.parse(localStorage.getItem('favorite-movie'));
        return favoritedMovie ? favoritedMovie : [];
    });


    //Genre List
    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BASE_URL}/genre/list?api_key=${process.env.REACT_APP_BASE_API_KEY}&language=en-US`)
            .then(res => {
                setGenreList(res.data.genres);
            })
            .catch(err => {
                console.log(err);
            });
    }, [genreList]);

    //Fetch movie list and set option to discover the movie list
    useEffect(() => {
        const discovers = {
            genre: selectedGenre ? selectedGenre.id : '',
            sort: sortOption,
        };

        setPagination(1);
        fetchMovie(discovers);
    }, [selectedGenre, sortOption]);

    //Save the favorited movie list to local storage
    useEffect(() => {
        localStorage.setItem('favorite-movie', JSON.stringify(listFavoriteMovie));
    }, [listFavoriteMovie]);


    //Fetch movie list 
    const fetchMovie = ({ genre, sort }) => {
        Axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_BASE_API_KEY}&language=en-US&include_adult=false&include_video=false&page&with_genres=${genre}&sort_by=${sort}`)
            .then(res => {
                setMovieList([...res.data.results])
            })
            .catch(err => {
                console.log(err);
            });
    };

    //Handle load more movie
    const handleLoadMore = () => {
        setPagination(pagination + 1);

        const genre = selectedGenre ? selectedGenre.id : '';
        const sort = sortOption;
        const page = pagination + 1;

        Axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_BASE_API_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&with_genres=${genre}&sort_by=${sort}`)
            .then(res => {
                setMovieList([...movieList, ...res.data.results])
            })
            .catch(err => {
                console.log(err);
            });
    };

    //
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
            addFavoriteMovie
        }}>
            {children}
        </MovieContext.Provider>
    );
};

export default AppContextProvider;
