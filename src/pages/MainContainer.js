import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import NavBar from '../components/NavBar';
import HomePage from './HomePage';
import FavoritesPage from './FavoritesPage';


const { Header, Content, Footer } = Layout;
const MainContainer = () => {
    return (
        <Fragment>
            <Header style={{ padding: 0 }}>
                <NavBar />
            </Header>
            <Content style={{ padding: '10px 20px' }}>
                <Route path='/' exact component={HomePage} />
                <Route path='/favorites' component={FavoritesPage} />
            </Content>
            <Footer>Footer</Footer>
        </Fragment>
    );
};

export default MainContainer;
