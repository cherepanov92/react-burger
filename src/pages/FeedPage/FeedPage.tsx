import React, { FC } from 'react';

import Feed from '../../components/Feed/Feed';

const FeedPage: FC<{ isOpen?: boolean }> = ({ isOpen }) => {
    return <Feed />;
};

export default FeedPage;