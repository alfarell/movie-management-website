import React, { useContext, Fragment } from 'react';
import { Row, Spin, Col, Button, Badge } from 'antd';
import _ from 'loadsh';
import { MovieContext } from '../services/AppContextProvider';
import CardContent from './CardContent';
import { HeartFilled } from '@ant-design/icons';


const DisplayMovieList = () => {
    const { movieList, handleLoadMore } = useContext(MovieContext);
    const favoritedMovie = JSON.parse(localStorage.getItem('favorited'));

    return (
        <Fragment>
            <Row gutter={[5, 5]} justify='center'>
                {movieList.length === 0
                    ? <Spin tip='Loading...' size='large' />
                    : movieList.map(movie => {
                        const favorite = _.find(favoritedMovie, movie);

                        return (
                            <Col key={movie.id} xs={11} sm={7} md={6} lg={6} xl={4} xxl={3} >
                                <Badge count={favorite ? <HeartFilled style={{ fontSize: 20, color: 'red' }} /> : null}>
                                    <CardContent data={movie} />
                                </Badge>
                            </Col>
                        )
                    })
                }
            </Row>

            {movieList.length === 0 ? null : <Button type='primary' onClick={handleLoadMore}>Load More</Button>}
        </Fragment>
    );
};

export default DisplayMovieList;
