import React, { useState, useContext } from 'react';
import { Card, Rate } from 'antd';
import _ from 'loadsh';
import { StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import FavoriteButton from '../ButtonComponent/FavoriteButton';
import { FavoriteMovieContext } from '../../services/FavoriteMovieContextProvider';


const CardContent = ({ data }) => {
    const [favoriteLabel, setFavoriteLabel] = useState({ display: 'none', filter: 'none' });
    const { addFavoriteMovie, listFavoriteMovie } = useContext(FavoriteMovieContext);

    const favorite = _.find(listFavoriteMovie, (favorited) => {
        return favorited.id === data.id
    });

    return (
        <div
            style={{ minWidth: '5rem', maxWidth: '11rem', position: 'relative' }}
            onMouseEnter={() => setFavoriteLabel({ display: 'block', filter: 'blur(1px) brightness(70%)' })}
            onMouseLeave={() => setFavoriteLabel({ display: 'none', filter: 'none' })}
        >
            <FavoriteButton
                hideMode={true}
                label={favorite ? 'Favorited' : 'Add to Favorite'}
                type={favorite ? 'primary' : 'default'}
                iconStyle={{ color: favorite ? 'white' : 'red' }}
                style={{ display: favorite ? 'block' : favoriteLabel.display, position: 'absolute' }}
                onClick={() => addFavoriteMovie(data)}
            />
            <Link to={'/movie/' + data.id}>
                <Card
                    hoverable
                    cover={
                        <img
                            src={data.poster_path
                                ? process.env.REACT_APP_IMAGE_URL + data.poster_path
                                : process.env.REACT_APP_DEFAULT_MOVIE_URL
                            }
                            style={{ filter: favoriteLabel.filter }}
                            alt='movie-poster'
                        />
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
            </Link>
        </div>
    );
};

export default CardContent;
