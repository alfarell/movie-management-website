import React, { useContext } from 'react';
import { Card, Row, Col, Empty } from 'antd';
import CardContent from '../components/CardContent';
import { MovieContext } from '../services/AppContextProvider';

const FavoritesPage = () => {
    const { listFavoriteMovie } = useContext(MovieContext);

    return (
        <div style={{ padding: '10px 20px' }}>
            <Card title='Favorite Movie' style={{ minHeight: '75vh' }}>
                <Row gutter={[5, 5]} justify='center'>
                    {listFavoriteMovie.length === 0
                        ? <Empty description={'No Favorite Movie'} />
                        : listFavoriteMovie.map(movie => {
                            return (
                                <Col key={movie.id} xs={11} sm={7} md={6} lg={6} xl={4} xxl={3} >
                                    <CardContent data={movie} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Card>
        </div>
    );
};

export default FavoritesPage;
