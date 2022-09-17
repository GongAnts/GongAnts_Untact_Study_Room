import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Friends from './Friends';
import { FRIENDS_SEARCH_REQUEST } from 'redux/types';

import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

export default function SearchModal() {
  const [email, setEmail] = useState('');
  const { friendsSearch } = useSelector((state) => state.friend);
  const dispatch = useDispatch();

  const onSearchClick = () => {
    dispatch({
      type: FRIENDS_SEARCH_REQUEST,
      payload: email,
    });
  };

  const friendSearchList = friendsSearch.map((fs) => (
    <Friends
      key={fs.user_id}
      user_email={fs.user_email}
      user_name={fs.user_name}
    />
  ));

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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={onSearchClick}
            >
              <SearchIcon
                className="cursor-pointer"
                style={{ fontSize: '1.2em' }}
              />
            </IconButton>
          </Paper>
          <p class="py-4">{friendsSearch && friendSearchList}</p>
        </label>
      </label>
    </>
  );
}
