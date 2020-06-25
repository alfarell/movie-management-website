import React, { useContext, Fragment } from 'react';
import { Row, Spin, Col, Button } from 'antd';
import { MovieContext } from '../services/AppContextProvider';
import CardContent from './CardContent';


const DisplayMovieList = () => {
    const { movieList, handleLoadMore } = useContext(MovieContext);

    return (
        <Fragment>
            <Row gutter={[5, 5]} justify='center'>
                {movieList.length === 0
                    ? <Spin tip='Loading...' size='large' />
                    : movieList.map(movie => {
                        return (
                            <Col key={movie.id} xs={11} sm={7} md={6} lg={6} xl={4} xxl={3} >
                                <CardContent data={movie} />
                            </Col>
                        )
                    })
                }
            </Row>

            {movieList.length === 0 ? null : <Button type='primary' onClick={handleLoadMore}>Load More</Button>}
        </Fragment>
    );
};

export default DisplayMovieList;
