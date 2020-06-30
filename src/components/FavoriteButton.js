import React, { useState } from 'react';
import { Button } from 'antd';
import { HeartFilled } from '@ant-design/icons';

const FavoriteButton = ({ label, type, onClick, style, iconStyle }) => {
    const [showLabel, setShowLabel] = useState(false);

    return (
        <Button
            danger
            id='favorite-button'
            type={type}
            icon={<HeartFilled style={iconStyle} />}
            style={style}
            onMouseEnter={() => setShowLabel(true)}
            onMouseLeave={() => setShowLabel(false)}
            onClick={onClick}
        >
            {showLabel ? label : null}
        </Button>
    );
};

export default FavoriteButton;
