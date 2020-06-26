import React from 'react';
import DisplayFilters from '../components/DisplayFilters';
import DisplayMovieList from '../components/DisplayMovieList';
import { Row, Col, Card, Typography } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const { Title } = Typography;
const HomePage = () => {
    return (
        <Row gutter={[10, 10]}>
            <Col xs={24} sm={24} md={24} lg={5} xl={4} xxl={4}>
                <Card title={<Title level={4} style={{ margin: 0 }}><FilterOutlined /> Discover</Title>}>
                    <DisplayFilters />
                </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={19} xl={20} xxl={20}>
                <Card className='display-movie-list'>
                    <DisplayMovieList />
                </Card>
            </Col>
        </Row>
    );
};

export default HomePage;
