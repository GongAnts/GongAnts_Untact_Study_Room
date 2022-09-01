/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { LOGOUT_REQUEST } from 'redux/types';
import { push } from 'react-router-redux';

import axios from 'axios';
import routes from 'routes.js';

// UI Components //
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { pointColor } from 'styles/color';
import SearchModal from 'components/Search/SearchModal';

// Icon //
import GongImg from 'assets/img/ms-icon-70x70.png';

function Header() {
  const location = useLocation();
  const history = useHistory();
  // const mobileSidebarToggle = (e) => {
  //   e.preventDefault();
  //   document.documentElement.classList.toggle('nav-open');
  //   var node = document.createElement('div');
  //   node.id = 'bodyClick';
  //   node.onclick = function () {
  //     this.parentElement.removeChild(this);
  //     document.documentElement.classList.toggle('nav-open');
  //   };
  //   document.body.appendChild(node);
  // };

  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    alert('로그아웃 하시겠습니까?');
    const config = { withCredentials: true };
    axios
      .get(`${process.env.REACT_APP_BASIC_SERVER_URL}/auth/signout`, config)
      .then((req, res) => {
        dispatch({
          type: LOGOUT_REQUEST,
        });
      });
    history.push('/');
    history.go(0);
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div class="drawer-content flex flex-col">
      <div class="w-full navbar bg-base-200 drop-shadow-lg">
        {/* <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div> */}
        <div class="flex-1 px-2 mx-2">
          <a href="/">
            <img src={GongImg} style={{ width: '30px', float: 'left' }} />
            GongAnts
          </a>
        </div>
        <div class="flex-none hidden lg:block">
          <span>
            <label for="search-modal" class="modal-button">
              <SearchIcon
                className="cursor-pointer"
                style={{ fontSize: '1.7em', color: pointColor }}
              />
            </label>
            <SearchModal />
          </span>
          <Button
            className="text-2xl"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <AccountCircleIcon
              style={{ fontSize: '2.4em', color: pointColor }}
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
