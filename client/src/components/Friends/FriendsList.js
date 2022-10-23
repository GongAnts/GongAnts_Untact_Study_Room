import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FRIENDS_LIST_REQUEST } from 'redux/types';

export default function FriendsList() {
  const dispatch = useDispatch();
  const { friendsList } = useSelector((state) => state.friend);

  useEffect(() => {
    dispatch({
      type: FRIENDS_LIST_REQUEST,
    });
  }, []);

  const friendListComponent = friendsList
    ? friendsList.map((fl, idx) => {
        return (
          <div key={idx}>
            <div>{fl.user_name}</div>
          </div>
        );
      })
    : () => {};

  return (
    <div>
      {friendsList && friendListComponent}
      <></>
    </div>
  );
}
