import React from 'react';

import Paper from '@mui/material/Paper';

export default function Friends({ user_email, user_name }) {
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
        <p>{user_name}</p>
        <p>{user_email}</p>
      </div>
    </Paper>
  );
}
