import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { REGISTER_REQUEST } from 'redux/types.js';
// css, icon, image //
// import 'assets/fonts/material-icon/css/material-design-iconic-font.min.css';
// import 'assets/css/style.css';
import signupimg from 'assets/images/signup-image.jpg';

function SignUp() {
  const [form, setValue] = useState({
    user_name: '',
    user_email: '',
    user_password: '',
    passwordCheck: '',
  });

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
      const { user_name, user_email, user_password, passwordCheck } = form;
      console.log(user_name, user_email, user_password);

      if (user_password !== passwordCheck) {
        alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
      } else {
        const user = { user_name, user_email, user_password };

        dispatch({
          type: REGISTER_REQUEST,
          payload: user,
        });
      }
    },
    [form, dispatch],
  );

  return (
    <div>
      <section class="signup mt-4">
        <div class="container">
          <div class="signup-content">
            <div class="signup-form">
              <h2 class="form-title">회원가입</h2>
              <form method="POST" class="register-form" id="register-form">
                <div class="form-group">
                  <label for="user_name">
                    <i class="zmdi zmdi-account material-icons-user_name"></i>
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    id="user_name"
                    placeholder="Your Name"
                    onChange={onChangeValue}
                  />
                </div>
                <div class="form-group">
                  <label for="user_email">
                    <i class="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    id="user_email"
                    placeholder="Your Email"
                    onChange={onChangeValue}
                  />
                </div>
                <div class="form-group">
                  <label for="user_password">
                    <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="user_password"
                    id="user_password"
                    placeholder="Password"
                    onChange={onChangeValue}
                  />
                </div>
                <div class="form-group">
                  <label for="passwordCheck">
                    <i class="zmdi zmdi-lock-outline"></i>
                  </label>
                  <input
                    type="password"
                    name="passwordCheck"
                    id="passwordCheck"
                    placeholder="Repeat your password"
                    onChange={onChangeValue}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    class="agree-term"
                  />
                  <label for="agree-term" class="label-agree-term">
                    <span>
                      <span></span>
                    </span>
                    I agree all statements in{' '}
                    <a href="#" class="term-service">
                      Terms of service
                    </a>
                  </label>
                </div>
                <div class="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    class="form-submit"
                    value="Register"
                    onClick={onSubmit}
                  />
                </div>
              </form>
            </div>
            <div class="signup-image">
              <figure>
                <img src={signupimg} alt="sing up image" />
              </figure>
              <a href="/signin" class="signup-image-link">
                I am already member
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
