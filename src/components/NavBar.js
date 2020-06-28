import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Typography, Row, Col, Menu } from 'antd';
import { PlayCircleOutlined, MenuOutlined } from '@ant-design/icons';
import { AppPages } from '../utils/AppPages';
import { MovieContext } from '../services/AppContextProvider';


const { Header } = Layout;
const { Title, Text } = Typography;

const NavBar = () => {
    const location = useLocation();
    const { listFavoriteMovie } = useContext(MovieContext);

    return (
        <Header className='nav-bar'>
            <Row justify='space-between' >
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                    <Title style={{ margin: 0 }}>
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
                                    {page.name === 'Favorites' ? <Text>({listFavoriteMovie.length})</Text> : ''}
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
