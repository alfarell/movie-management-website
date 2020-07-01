import React, { useState, useContext } from 'react';
import { Card, Rate } from 'antd';
import _ from 'loadsh';
import { StarFilled } from '@ant-design/icons';
import { MovieContext } from '../services/AppContextProvider';
import FavoriteButton from './FavoriteButton';


const CardContent = ({ data }) => {
    const [favoriteLabel, setFavoriteLabel] = useState({ display: 'none', filter: 'none' });
    const { addFavoriteMovie, listFavoriteMovie } = useContext(MovieContext);

    const favorite = _.find(listFavoriteMovie, data);

    return (
        <div
            style={{ minWidth: '5rem', maxWidth: '11rem', position: 'relative' }}
            onMouseEnter={() => setFavoriteLabel({ display: 'block', filter: 'blur(1px) brightness(70%)' })}
            onMouseLeave={() => setFavoriteLabel({ display: 'none', filter: 'none' })}
        >
            <FavoriteButton
                label={favorite ? 'Favorited' : 'Add to Favorite'}
                type={favorite ? 'primary' : 'default'}
                iconStyle={{ color: favorite ? 'white' : 'red' }}
                style={{ display: favorite ? 'block' : favoriteLabel.display }}
                onClick={() => addFavoriteMovie(data)}
            />
            <Card
                hoverable
                cover={
                    <img
                        src={process.env.REACT_APP_IMAGE_URL + data.poster_path}
                        style={{ filter: favoriteLabel.filter }}
                        alt='movie-poster'
                    />
                }
                onClick={() => console.log('card test')}
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
        </div>
    );
};

export default CardContent;
