import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';

export default function NotificaitonModal() {
  const dispatch = useDispatch();
  const { friendsRequest } = useSelector((state) => state.friend);

  const FriendsRequestList = friendsRequest?.map((f, idx) => {
    return (
      <Paper
        key={idx}
        variant="outlined"
        sx={{
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          width: 460,
        }}
      >
        <div key={idx}>{f.user_name}님이 친구신청을 했습니다.</div>
      </Paper>
    );
  });

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
