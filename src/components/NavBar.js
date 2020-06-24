import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Typography, Row, Col, Menu } from 'antd';
import { PlayCircleOutlined, MenuOutlined } from '@ant-design/icons';
import { AppPages } from '../utils/AppPages';


const { Header } = Layout;
const { Title } = Typography;
const NavBar = () => {
    const location = useLocation();

    return (
        <Header className='nav-bar'>
            <Row justify='space-between' >
                <Col>
                    <Title>
                        <PlayCircleOutlined />
                        Movie
                    </Title>
                </Col>
                <Col xs={1} sm={9} md={8} lg={6} xl={5} xxl={4}>
                    <Menu
                        className='nav-menu'
                        mode='horizontal'
                        theme='light'
                        selectedKeys={[location.pathname]}
                        overflowedIndicator={<MenuOutlined style={{ fontSize: 16 }} />}
                    >
                        {AppPages.map(page => {
                            return (
                                <Menu.Item key={page.path} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                                    <Link to={page.path}>{page.name}</Link>
                                    {page.name === 'Favorites' ? <PlayCircleOutlined /> : ''}
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </Col>
            </Row>
        </Header>
    );
};

export default NavBar;
