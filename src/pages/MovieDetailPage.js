import React, { useState, useEffect, useContext, Fragment } from 'react';
import Axios from 'axios';
import _ from 'loadsh';
import { Spin, Typography, Row, Col, Card, Rate, Tag, List, Alert } from 'antd';
import { StarFilled } from '@ant-design/icons';
import FavoriteButton from '../components/FavoriteButton';
import { MovieContext } from '../services/AppContextProvider';


const { Title, Text, Paragraph } = Typography;

const MovieDetailPage = ({ match }) => {
    const [movieDetail, setMovieDetail] = useState({});
    const [movieCredits, setMovieCredits] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { addFavoriteMovie, listFavoriteMovie, movieList } = useContext(MovieContext);

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                await getMovieDetail();
                await getMovieCredits();
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => {
            setMovieCredits({});
            setMovieDetail({});
        }
    }, []);

    const getMovieDetail = async () => {
        const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${match.params.id}`, {
            params: {
                api_key: process.env.REACT_APP_BASE_API_KEY,
                language: 'en-US'
            }
        });

        setMovieDetail(response.data);
    }

    const getMovieCredits = async () => {
        const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${match.params.id}/credits`, {
            params: {
                api_key: process.env.REACT_APP_BASE_API_KEY,
                language: 'en-US'
            }
        });

        setMovieCredits(response.data);
    }

    if (loading === true) {
        return (
            <div className='movie-detail-container'>
                <Spin size='large' tip='Loading...' />
            </div>
        )
    }
    if (error) {
        return (
            <div className='movie-detail-container'>
                <Alert
                    description='Some Error is Occured, Please check your internet connection and refresh the page'
                    type='error'
                    showIcon
                />
            </div>
        )
    }

    const {
        title,
        tagline,
        poster_path,
        backdrop_path,
        vote_average,
        overview,
        genres,
        release_date,
        vote_count
    } = movieDetail;
    const { cast } = movieCredits;

    const favorite = _.find(listFavoriteMovie, (data) => {
        return data.id === movieDetail.id;
    });

    const handleAddFavorite = (id) => {
        const newFavoriteMovie = _.find(movieList, (data) => {
            return data.id === id;
        });

        addFavoriteMovie(newFavoriteMovie);
    }

    return (
        <Fragment>
            <div style={{ boxShadow: '0 -7px 15px #999999', marginBottom: 10 }}>
                <img
                    src={process.env.REACT_APP_IMAGE_URL + backdrop_path}
                    alt='background-poster'
                    className='movie-detail-banner'
                />
                <Row gutter={[10, 10]} justify='center' align='bottom' style={{ padding: 20 }}>
                    <Col xs={9} sm={7} md={6} lg={5} xl={4} xxl={3} className='poster-container'>
                        <img
                            src={process.env.REACT_APP_IMAGE_URL + poster_path}
                            alt='movie-poster'
                            className='movie-detail-poster'
                        />
                        <FavoriteButton
                            label={favorite ? 'Favorited' : 'Add to Favorite'}
                            type={favorite ? 'primary' : 'default'}
                            iconStyle={{ color: favorite ? 'white' : 'red' }}
                            style={{ minWidth: '6rem', maxWidth: '12rem', width: '100%', marginTop: 5 }}
                            onClick={() => handleAddFavorite(movieDetail.id)}
                        />
                    </Col>
                    <Col xs={14} sm={13} md={11} lg={9} xl={8} xxl={7}>
                        <Title level={3} style={{ marginBottom: 0 }}>{title}</Title>
                        <Text type='secondary'>{tagline}</Text><br />
                        <Text type='secondary'>{release_date}</Text><br />
                        <Rate value={vote_average / 2} disabled allowHalf character={<StarFilled />} />
                        <Text style={{ marginLeft: 10 }}>({vote_count})</Text>
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
                    grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 5, xl: 7, xxl: 7 }}
                    dataSource={cast}
                    rowKey={({ id }) => id}
                    itemLayout='horizontal'
                    pagination={{ defaultPageSize: 14, showSizeChanger: false }}
                    renderItem={data => {
                        return (
                            <List.Item>
                                <Card
                                    cover={
                                        <img
                                            src={process.env.REACT_APP_IMAGE_URL + data.profile_path}
                                            alt='cast'
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
        </Fragment >
    );
};

export default MovieDetailPage;
