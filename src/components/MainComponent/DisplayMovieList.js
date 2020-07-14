import React, { useContext, Fragment } from 'react';
import { Row, Spin, Col, Button, Alert } from 'antd';
import { MovieContext } from '../../services/AppContextProvider';
import CardContent from './CardContent';


const DisplayMovieList = () => {
    const { movieList, setPagination, loading, error } = useContext(MovieContext);

    return (
        <Fragment>
            <Row gutter={[10, 10]} justify='center'>
                {movieList.map(movie => {
                    return (
                        <Col key={movie.id} xs={11} sm={7} md={6} lg={6} xl={4} xxl={3} data-testid='movie-list'>
                            <CardContent data={movie} />
                        </Col>
                    )
                })}
                {loading && <Spin tip='Loading...' size='large' />}
                {error.status && (<Alert
                    description='Some Error is Occured, Please check your internet connection and try again or refresh the page'
                    type='error'
                    showIcon
                    data-testid='movielist-error-message'
                />)}
            </Row>

            {!loading && movieList.length > 0 &&
                (<Button
                    type='primary'
                    loading={loading}
                    onClick={() => setPagination(pagination => pagination + 1)}
                >
                    Load more
                </Button>)
            }
        </Fragment>
    );
};

export default DisplayMovieList;
