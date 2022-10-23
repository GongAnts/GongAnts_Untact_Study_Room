import React from 'react';
import { useDispatch } from 'react-redux';

import Paper from '@mui/material/Paper';
import { FRIENDS_SEND_REQUEST } from 'redux/types';

export default function Friends({ user_email, user_name, state }) {
  const dispatch = useDispatch();

  const onClickRequest = () => {
    const body = {
      email: user_email,
    };
    dispatch({
      type: FRIENDS_SEND_REQUEST,
      payload: body,
    });
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        width: 460,
      }}
    >
      <img src="https://picsum.photos/50/50" />
      <div className="mx-3 flex-1">
        <p>{user_name}</p>
        <p>{user_email}</p>
      </div>
      {/* 친구아니면 요청, 친구 요청중이면 요청 중, 친구이면 아무것도 안 뜸 */}
      {state == -1 ? (
        <button
          className="btn btn-outline float-right"
          onClick={onClickRequest}
        >
          요청
        </button>
      ) : state == 0 ? (
        <button className="btn btn-active float-right" disabled="true">
          요청중
        </button>
      ) : (
        <></>
      )}
    </Paper>
  );
}
