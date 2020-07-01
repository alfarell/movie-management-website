import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Spin, Typography, Row, Col, Card, Rate, Tag, List } from 'antd';
import { StarFilled } from '@ant-design/icons';


const { Title, Text, Paragraph } = Typography;

const MovieDetailPage = ({ match }) => {
    const [movieDetail, setMovieDetail] = useState({});
    const [movieCredits, setMovieCredits] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);

        Axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${match.params.id}/credits?api_key=${process.env.REACT_APP_BASE_API_KEY}&language=en-US`)
            .then(res => {
                setMovieCredits(res.data);
                setError(false);
            })
            .catch(res => {
                setError(true);
            });

        Axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${match.params.id}?api_key=${process.env.REACT_APP_BASE_API_KEY}&language=en-US`)
            .then(res => {
                setMovieDetail(res.data);
                setError(false);
                setLoading(false);
            })
            .catch(res => {
                setError(true);
                setLoading(false);
            });

        return () => {
            setMovieCredits({});
            setMovieDetail({});
        }
    }, []);

    if (loading) return <Spin size='large' tip='Loading...' />
    if (error) return <Text>Error</Text>

    const { title, tagline, poster_path, backdrop_path, vote_average, overview, genres, release_date } = movieDetail;
    const { cast, crew } = movieCredits;
    console.log(movieDetail);
    console.log(movieCredits);

    return (
        <div>
            <div style={{ boxShadow: '0 -7px 15px #999999', marginBottom: 10 }}>
                <img src={process.env.REACT_APP_IMAGE_URL + backdrop_path} alt='background-poster' className='movie-detail-banner' />
                <Row gutter={[10, 10]} justify='center' align='bottom' style={{ marginTop: -70, padding: 20 }}>
                    <Col xs={7} sm={6} md={5} lg={4} xl={3} xxl={3} style={{ boxSizing: 'content-box' }}>
                        <img src={process.env.REACT_APP_IMAGE_URL + poster_path} alt='movie-poster' className='movie-detail-poster' />
                    </Col>
                    <Col xs={15} sm={13} md={11} lg={9} xl={8} xxl={7}>
                        <Title level={3} style={{ marginBottom: 0 }}>{title}</Title>
                        <Text type='secondary'>{tagline}</Text><br />
                        <Text type='secondary'>{release_date}</Text><br />
                        <Rate value={vote_average / 2} disabled allowHalf character={<StarFilled />} />
                        <Row>
                            {genres?.map(genre => {
                                return (
                                    <Col key={genre.id}>
                                        <Tag color='blue'>{genre.name}</Tag>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                </Row>
            </div>
            <Card title='Overview' style={{ margin: 10 }}>
                <Paragraph>{overview}</Paragraph>
            </Card>
            <Card title='Cast' style={{ margin: 10 }}>
                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={cast}
                    itemLayout='horizontal'
                    pagination
                    renderItem={data => {
                        return (
                            <List.Item>
                                <Card
                                    key={data.id}
                                    cover={
                                        <img
                                            src={process.env.REACT_APP_IMAGE_URL + data.profile_path}
                                            alt='profile-photo'
                                        />
                                    }
                                    style={{ minWidth: '5rem', maxWidth: '11rem' }}
                                >
                                    <Card.Meta title={data.name} />
                                </Card>
                            </List.Item>
                        )
                    }}
                />
            </Card>
        </div >
    );
};

export default MovieDetailPage;
