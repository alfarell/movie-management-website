import React, { useContext, Fragment } from 'react';
import { Row, Spin, Col, Button, Alert } from 'antd';
import { MovieContext } from '../services/AppContextProvider';
import CardContent from './CardContent';


const RenderMovieList = ({ movieList, isLoading, error }) => {
    if (isLoading.loading && isLoading.loader === 'movie-list') {
        return <Spin tip='Loading...' size='large' />;
    }
    if (error.status && error.error === 'fetch-movie-error') {
        return (
            <Alert
                description='Some Error is Occured, Please check your internet connection and refresh the page'
                type='error'
                showIcon
            />
        );
    }

    return movieList.map(movie => {
        return (
            <Col key={movie.id} xs={11} sm={7} md={6} lg={6} xl={4} xxl={3} >
                <CardContent data={movie} />
            </Col>
        )
    });
};

const DisplayMovieList = () => {
    const { movieList, handleLoadMore, isLoading, error } = useContext(MovieContext);

    return (
        <Fragment>
            <Row gutter={[10, 10]} justify='center'>
                <RenderMovieList {...{ movieList, isLoading, error }} />
            </Row>

            {movieList.length === 0
                ? null
                : <Fragment>
                    <Button
                        type='primary'
                        loading={isLoading.loading && isLoading.loader === 'load-more-movie'}
                        onClick={handleLoadMore}
                    >
                        Load more
                    </Button>
                    <Alert
                        message='Error'
                        description='Failed to load more movie, please check your internet connection and try again'
                        type='error'
                        showIcon
                        style={{ display: error.status && error.error === 'load-more-movie-error' ? 'block' : 'none' }}
                    />
                </Fragment>
            }
        </Fragment>
    );
};

export default DisplayMovieList;
