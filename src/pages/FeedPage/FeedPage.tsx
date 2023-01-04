import React, { FC } from 'react';

import Feed from '../../components/Feed/Feed';

const FeedPage: FC<{ isOrderInfoMode?: boolean }> = ({ isOrderInfoMode }) => {
    return <Feed isOrderInfoMode={!!isOrderInfoMode} />;
};

export default FeedPage;