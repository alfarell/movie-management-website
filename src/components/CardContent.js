import React, { useState, useContext } from 'react';
import { Card, Rate, Button } from 'antd';
import _ from 'loadsh';
import { StarFilled, HeartFilled } from '@ant-design/icons';
import { MovieContext } from '../services/AppContextProvider';


const CardContent = ({ data }) => {
    const [displayFavorite, setDisplayFavorite] = useState({ display: 'none', filter: 'none' });
    const { addFavoriteMovie, listFavoriteMovie } = useContext(MovieContext);

    const favorite = _.find(listFavoriteMovie, data);

    return (
        <Card
            hoverable
            style={{ minWidth: '5rem', maxWidth: '11rem' }}
            cover={
                <div
                    style={{ width: '100%' }}
                    onMouseEnter={() => setDisplayFavorite({ display: 'block', filter: 'blur(1px) brightness(70%)' })}
                    onMouseLeave={() => setDisplayFavorite({ display: 'none', filter: 'none' })}
                >
                    <img
                        src={process.env.REACT_APP_IMAGE_URL + data.poster_path}
                        style={{ width: '100%', filter: displayFavorite.filter }}
                        alt='movie-poster'
                    />
                    <Button
                        danger
                        id='favorite-button'
                        type={favorite ? 'primary' : 'default'}
                        icon={<HeartFilled style={{ color: favorite ? 'white' : 'red' }} />}
                        style={{ display: favorite ? 'block' : displayFavorite.display }}
                        onClick={() => addFavoriteMovie(data)}
                    >
                        {favorite ? 'Favorited' : 'Add to Favorite'}
                    </Button>
                </div>
            }
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
