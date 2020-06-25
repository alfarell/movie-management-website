import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Row, Spin, Card, Col } from 'antd';

const DisplayMovieList = () => {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_BASE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
            .then(res => {
                console.log(res.data)
                setMovieList([...movieList, ...res.data.results])
            });
    }, [])

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
