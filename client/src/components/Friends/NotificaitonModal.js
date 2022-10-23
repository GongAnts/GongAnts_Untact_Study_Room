import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FRIENDS_RQLIST_REQUEST } from 'redux/types';

export default function NotificaitonModal() {
  const dispatch = useDispatch();
  const { friendsRequest } = useSelector((state) => state.friend);

  useEffect(() => {
    dispatch({
      type: FRIENDS_RQLIST_REQUEST,
    });
  }, []);

  const FriendsRequestList = friendsRequest
    ? friendsRequest.map((f, idx) => {
        return <div key={idx}>{f.user_name}</div>;
      })
    : () => {};

  return (
    <>
      <input type="checkbox" id="notification-modal" className="modal-toggle" />
      <label for="notification-modal" className="modal cursor-pointer">
        <label className="modal-box relative" for="">
          {friendsRequest && FriendsRequestList}
        </label>
      </label>
    </>
  );
}
