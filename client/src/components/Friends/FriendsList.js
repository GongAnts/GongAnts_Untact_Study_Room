import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FRIENDS_LIST_REQUEST, FRIENDS_RQLIST_REQUEST } from 'redux/types';

export default function FriendsList() {
  const dispatch = useDispatch();
  const { friendsList, friendsRequest } = useSelector((state) => state.friend);

  useLayoutEffect(() => {
    dispatch({
      type: FRIENDS_LIST_REQUEST,
    });
    dispatch({
      type: FRIENDS_RQLIST_REQUEST,
    });
  }, [dispatch]);

  const friendListComponent = friendsList?.map((fl, idx) => {
    return (
      <div key={idx}>
        <div>{fl.user_name}</div>
      </div>
    );
  });

  return (
    <div>
      {console.log(friendsList, friendsRequest)}
      {friendsList && friendListComponent}
      <></>
    </div>
  );
}
