import React from 'react';

import Paper from '@mui/material/Paper';

export default function Friends() {
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
      <div className="mx-3">
        <p>친구 이름</p>
        <p>abc@naver.com</p>
      </div>
    </Paper>
  );
}
