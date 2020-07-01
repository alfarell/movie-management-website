import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import NavBar from '../components/NavBar';
import HomePage from './HomePage';
import FavoritesPage from './FavoritesPage';
import MovieDetailPage from './MovieDetailPage';


const { Header, Content, Footer } = Layout;
const MainContainer = () => {
    return (
        <Fragment>
            <Header style={{ padding: 0 }}>
                <NavBar />
            </Header>
            <Content>
                <Route path='/' exact component={HomePage} />
                <Route path='/favorites' component={FavoritesPage} />
                <Route path='/movie/:id' component={MovieDetailPage} />
            </Content>
            <Footer>Footer</Footer>
        </Fragment>
    );
};

export default MainContainer;
