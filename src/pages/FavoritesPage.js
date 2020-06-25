import React, { useContext } from 'react';
import { Card, Row, Col } from 'antd';
import { MovieContext } from '../services/AppContextProvider';
import CardContent from '../components/CardContent';

const FavoritesPage = () => {
    const { favoritedMovie } = useContext(MovieContext);

    return (
        <Card>
            <Row>
                {favoritedMovie.map(movie => {
                    return (
                        <Col key={movie.id} xs={11} sm={7} md={6} lg={6} xl={4} xxl={3} >
                            <CardContent data={movie} />
                        </Col>
                    )
                })}
            </Row>
        </Card>
    );
};

export default FavoritesPage;
