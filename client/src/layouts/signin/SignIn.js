import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST } from 'redux/types.js';
import { useHistory } from 'react-router-dom';

// UI components //
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';

// Google Login //
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';

// img //
import iconImage from 'assets/img/ms-icon-70x70.png';

function SignIn(req) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [form, setValue] = useState({
    user_id: '',
    user_password: '',
  });

  const onChangeValue = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { user_id, user_password } = form;

      dispatch({
        type: LOGIN_REQUEST,
        payload: { user_id, user_password },
      });

      history.push('/');
      history.go(0);
    },
    [form, dispatch],
  );

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className="container">
      <section className="bg-gray-200 h-screen w-screen flex justify-center items-center">
        <div className="shadow-lg w-96 rounded-lg h-3/5 bg-white">
          <div className="text-center">
            <div className="flex flex-col justify-center">
              <img
                className="text-center w-12"
                src={iconImage}
                style={{ margin: '25px auto' }}
              />
              <h2 className="text-3xl font-medium">로그인</h2>
              <form method="POST" id="login-form">
                <div className="form-group mt-5">
                  <label for="user_id">
                    <AccountBoxIcon className="text-xl"></AccountBoxIcon>
                  </label>
                  <input
                    type="text"
                    className="input-sm"
                    name="user_id"
                    id="user_id"
                    placeholder="ID"
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-group">
                  <label for="user_password">
                    <LockIcon></LockIcon>
                  </label>
                  <input
                    type="password"
                    className="input-sm"
                    name="user_password"
                    id="user_password"
                    placeholder="Password"
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-group form-button mt-5">
                  <Button
                    type="submit"
                    className="w-3/5"
                    name="signin"
                    id="signin"
                    variant="outlined"
                    onClick={onSubmit}
                    color="point"
                  >
                    Log in
                  </Button>
                </div>
              </form>
              <div className="mt-3">
                <ul className="socials">
                  <li>
                    <Button
                      type="submit"
                      className="w-3/5"
                      variant="outlined"
                      color="point"
                      startIcon={<GoogleIcon />}
                      href="http://localhost:4000/auth/google"
                    >
                      구글로 로그인하기
                    </Button>
                  </li>
                  <li className="signin-image mt-3">
                    <Button
                      type="submit"
                      className="w-3/5"
                      variant="contained"
                      href="/signup"
                    >
                      회원가입
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
