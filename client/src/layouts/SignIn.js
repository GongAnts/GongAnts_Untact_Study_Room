import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST } from 'redux/types.js';

// UI components //
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// css, icon, image //
// import 'assets/fonts/material-icon/css/material-design-iconic-font.min.css';
// import 'assets/css/style.css';

function SignIn(req) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [form, setValue] = useState({
    user_name: '',
    user_password: '',
  });

  // const {  } = useSelector((state) => state.auth);
  const onChangeValue = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { user_name, user_password } = form;

      dispatch({
        type: LOGIN_REQUEST,
        payload: { user_name, user_password },
      });
    },
    [form, dispatch],
  );

  return (
    <div className='container'>
      <section className="bg-gray-200 h-screen w-screen flex justify-center items-center">
        <div className="shadow-lg w-96 rounded-lg h-3/6 bg-white">
          <div className="text-center">
            <div className="signin-image">
              <a href="/signup" className="signup-image-link">
                Create an account
              </a>
            </div>

            <div className="signin-form">
              <p>'공개미'에 온 것을 환영합니다.</p>
              <h2 className="m-3">로그인</h2>
              <form method="POST" className="register-form" id="login-form">
                <div className="form-group">
                  <label for="user_name">
                    <AccountBoxIcon></AccountBoxIcon>
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    id="user_name"
                    placeholder="Your Name"
                    onChange={onChangeValue}
                  />
                </div>
                <div className="form-group">
                  <label for="user_password">
                    <LockIcon></LockIcon>
                  </label>
                  <input
                    type="password"
                    name="user_password"
                    id="user_password"
                    placeholder="Password"
                    onChange={onChangeValue}
                  />
                </div>
                <FormGroup
                  className="form-group"
                  style={{ width: '100%', height: '30px' }}
                >
                  <FormControlLabel
                    className='text-right'
                    control={<Checkbox size="small" />}
                    label="Remember me"
                  />
                </FormGroup>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="btn"
                    value="Log in"
                    onClick={onSubmit}
                  />
                </div>
              </form>
              <div className="social-login">
                <span className="social-label">Or login with</span>
                <ul className="socials">
                  <li>
                    <a href="http://localhost:4000/auth/google">
                      {/* 서버 URL 변경 시 수정 필요*/}
                      <i className="display-flex-center zmdi zmdi-google"></i>
                    </a>
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
