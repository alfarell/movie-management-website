import React from 'react';
import { Card, Row, Col } from 'antd';
import CardContent from '../components/CardContent';

const FavoritesPage = () => {
    const favoritedMovie = JSON.parse(localStorage.getItem('favorited'));

    return (
        <Card title='Favorite Movie'>
            <Row>
                {favoritedMovie
                    ? favoritedMovie.map(movie => {
                        return (
                            <Col key={movie.id} xs={11} sm={7} md={6} lg={6} xl={4} xxl={3} >
                                <CardContent data={movie} />
                            </Col>
                        )
                    })
                    : null
                }
            </Row>
        </Card>
    );
};

export default FavoritesPage;
