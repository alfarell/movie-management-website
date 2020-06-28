import React, { useContext, Fragment } from 'react';
import { Row, Spin, Col, Button, Typography } from 'antd';
import { MovieContext } from '../services/AppContextProvider';
import CardContent from './CardContent';


const { Text } = Typography;

const RenderMovieList = ({ movieList, isLoading, error }) => {
    if (isLoading.loading && isLoading.loader === 'movie-list') return <Spin tip='Loading...' size='large' />;
    if (error.status && error.error === 'movie-list') return <Text>Some Error is Occured</Text>

    return movieList.map(movie => {
        return (
            <Col key={movie.id} xs={11} sm={7} md={6} lg={6} xl={4} xxl={3} >
                <CardContent data={movie} />
            </Col>
        )
    })
}

const DisplayMovieList = () => {
    const { movieList, handleLoadMore, isLoading, error } = useContext(MovieContext);

    return (
        <Fragment>
            <Row gutter={[5, 5]} justify='center'>
                <RenderMovieList {...{ movieList, isLoading, error }} />
            </Row>

            {movieList.length === 0
                ? null
                : <Button
                    type='primary'
                    loading={isLoading.loading && isLoading.loader === 'load-more-movie' ? true : false}
                    onClick={handleLoadMore}> Load more </Button>
            }
        </Fragment>
    );
};

export default DisplayMovieList;
