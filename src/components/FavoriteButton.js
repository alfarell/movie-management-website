import React, { useState } from 'react';
import { Button } from 'antd';
import { HeartFilled } from '@ant-design/icons';

const FavoriteButton = ({ label, type, hideMode, onClick, style, iconStyle }) => {
    const [showLabel, setShowLabel] = useState(false);

    return (
        <Button
            danger
            type={type}
            icon={<HeartFilled style={iconStyle} />}
            style={{ ...style, zIndex: 1 }}
            onMouseEnter={() => setShowLabel(true)}
            onMouseLeave={() => setShowLabel(false)}
            onClick={onClick}
        >
            {hideMode
                ? showLabel ? label : null
                : label
            }
        </Button>
    );
};

export default FavoriteButton;
