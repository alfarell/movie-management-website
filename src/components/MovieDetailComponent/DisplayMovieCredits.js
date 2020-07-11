import React from 'react';
import { Card, List } from 'antd';

const DisplayMovieCredits = ({ movieCredit }) => {
    return (
        <Card title='Cast' style={{ margin: 10 }}>
            <List
                grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 5, xl: 7, xxl: 7 }}
                dataSource={movieCredit}
                rowKey={({ id }) => id}
                itemLayout='horizontal'
                pagination={{ defaultPageSize: 14, showSizeChanger: false }}
                renderItem={data => {
                    return (
                        <List.Item>
                            <Card
                                cover={
                                    <img
                                        src={data.profile_path
                                            ? process.env.REACT_APP_IMAGE_URL + data.profile_path
                                            : process.env.REACT_APP_DEFAULT_PROFILE_URL
                                        }
                                        alt='cast'
                                    />
                                }
                                style={{ minWidth: '5rem', maxWidth: '11rem' }}
                            >
                                <Card.Meta title={data.name} />
                            </Card>
                        </List.Item>
                    )
                }}
            />
        </Card>
    );
};

export default DisplayMovieCredits;
