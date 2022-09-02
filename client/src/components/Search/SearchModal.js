import React from 'react';

import Friends from './Friends';

import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

export default function SearchModal() {
  return (
    <>
      <input type="checkbox" id="search-modal" class="modal-toggle" />
      <label for="search-modal" class="modal cursor-pointer">
        <label class="modal-box relative" for="">
          <Paper
            component="form"
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 470,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="친구 아이디 검색하기"
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon
                className="cursor-pointer"
                style={{ fontSize: '1.2em' }}
              />
            </IconButton>
          </Paper>
          <p class="py-4">
            <Friends />
          </p>
        </label>
      </label>
    </>
  );
}
