import React, { useState, useEffect, useContext, Fragment } from 'react';
import Axios from 'axios';
import _ from 'loadsh';
import { Spin, Typography, Row, Col, Card, Rate, Tag, Alert } from 'antd';
import { StarFilled } from '@ant-design/icons';
import FavoriteButton from '../components/ButtonComponent/FavoriteButton';
import { MovieContext } from '../services/AppContextProvider';
import DisplayMovieCredits from '../components/MovieDetailComponent/DisplayMovieCredits';


const { Title, Text, Paragraph } = Typography;

const MovieDetailPage = ({ match }) => {
    const [movieDetail, setMovieDetail] = useState({});
    const [movieCredits, setMovieCredits] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { addFavoriteMovie, listFavoriteMovie } = useContext(MovieContext);

    useEffect(() => {
        setLoading(true);

        fetchData(
            `${process.env.REACT_APP_BASE_URL}/movie/${match.params.id}`,
            setMovieDetail
        );
        fetchData(
            `${process.env.REACT_APP_BASE_URL}/movie/${match.params.id}/credits`,
            setMovieCredits
        );

        return () => {
            setMovieCredits({});
            setMovieDetail({});
        }
    }, [match.params.id]);

    const fetchData = async (url, setState) => {
        try {
            const response = await Axios.get(url, {
                params: {
                    api_key: process.env.REACT_APP_BASE_API_KEY,
                    language: 'en-US'
                }
            });

            setState(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
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
                            onClick={() => addFavoriteMovie(movieDetail)}
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
            <DisplayMovieCredits movieCredit={cast} />
        </Fragment >
    );
};

export default MovieDetailPage;
