import React, { useContext } from 'react';
import { Row, Spin, Card, Col } from 'antd';
import { MovieContext } from '../services/AppContextProvider';

const DisplayMovieList = () => {
    const { movieList } = useContext(MovieContext);

    return (
        <Row gutter={[5, 5]} justify='center'>
            {movieList.length === 0
                ? <Spin tip='Loading...' size='large' />
                : movieList.map(movie => {
                    return (
                        <Col key={movie.id} xs={11} sm={7} md={6} lg={6} xl={4} xxl={3} >
                            <Card
                                hoverable
                                style={{ minWidth: '5rem', maxWidth: '11rem' }}
                                cover={<img src={process.env.REACT_APP_IMAGE_URL + movie.poster_path} alt='movie-poster' />}
                            >
                                <Card.Meta title={movie.title} />
                            </Card>
                        </Col>
                    )
                })
            }
        </Row>
    );
};

export default DisplayMovieList;
