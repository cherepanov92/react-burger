import React, { FC, useEffect } from 'react';

import Feed from '../../components/Feed/Feed';
import { useAppDispatch } from '../../services/reducers/Root';
import { WS_CLOSE_CONNECTION, WS_CONNECTION_START } from '../../services/actions/WebSocket';

const FeedPage: FC<{ isOrderInfoMode?: boolean }> = ({ isOrderInfoMode }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START
        });

        return () => {
            dispatch({
                type: WS_CLOSE_CONNECTION
            });
        };
    }, [dispatch]);

    return <Feed isOrderInfoMode={!!isOrderInfoMode} />;
};

export default FeedPage;