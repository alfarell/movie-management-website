import React, { useState, useContext } from 'react';
import { Card, Rate } from 'antd';
import { StarFilled, HeartFilled } from '@ant-design/icons';
import { MovieContext } from '../services/AppContextProvider';


const CardContent = ({ data }) => {
    const [displayFavorite, setDisplayFavorite] = useState('none');

    const { addFavoriteMovie } = useContext(MovieContext);

    return (
        <Card
            hoverable
            onMouseEnter={() => setDisplayFavorite('block')}
            onMouseLeave={() => setDisplayFavorite('none')}
            style={{ minWidth: '5rem', maxWidth: '11rem' }}
            cover={
                <img src={process.env.REACT_APP_IMAGE_URL + data.poster_path} alt='movie-poster' />
            }
            actions={[
                <HeartFilled
                    key='favorite'
                    style={{ display: displayFavorite }}
                    onClick={() => addFavoriteMovie(data)}
                />
            ]}
        >
            <Card.Meta title={data.title} />
            <Rate
                disabled
                value={data.vote_average / 2}
                style={{ maxWidth: 80 }}
                character={
                    <StarFilled style={{ maxWidth: 8, minWidth: 2 }} />
                }
            />
        </Card>
    );
};

export default CardContent;
