export const mockGenreList = {
    genres: [
        {
            id: 1,
            name: 'Fantasy'
        },
        {
            id: 2,
            name: 'Sci-Fi'
        }
    ]
}

export const mockMovieList = {
    results: [
        {
            id: 1,
            title: 'Test Movie List',
            poster_path: 'test_poster',
            average_score: 10
        },
        {
            id: 2,
            title: 'Test Movie List 2',
            poster_path: null,
            average_score: 10
        },
    ]
}

export const mockLoadMoreMovie = {
    results: [
        {
            id: 3,
            title: 'Test Load More Movie',
            poster_path: null,
            average_score: 10
        },
    ]
}

export const mockMovieDetail = {
    id: 1,
    title: 'Test Title',
    tagline: 'Test Tagline',
    poster_path: '/test_poster',
    backdrop_path: '/test_backdrop',
    vote_average: 10,
    overview: 'Test Overview',
    genres: [{ id: 1, name: 'Test Genre' }],
    release_date: '2020-01-01',
    vote_count: 100
}

export const mockMovieCast = {
    cast: [
        {
            id: 1,
            name: 'Test Cast',
            profile_path: 'profile_test'
        },
        {
            id: 2,
            name: 'Test Cast 2',
            profile_path: null
        }
    ]
}