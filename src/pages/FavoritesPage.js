import React from 'react';
import { Card, Row, Col, Empty } from 'antd';
import CardContent from '../components/CardContent';

const FavoritesPage = () => {
    const favoritedMovie = JSON.parse(localStorage.getItem('favorited'));

    return (
        <Card title='Favorite Movie'>
            <Row gutter={[5, 5]} justify='center'>
                {favoritedMovie.length === 0
                    ? <Empty description={'No Favorite Movie'} />
                    : favoritedMovie.map(movie => {
                        return (
                            <Col key={movie.id} xs={11} sm={7} md={6} lg={6} xl={4} xxl={3} >
                                <CardContent data={movie} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Card>
    );
};

export default FavoritesPage;
