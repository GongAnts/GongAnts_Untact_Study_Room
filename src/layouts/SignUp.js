import React from 'react';

import { Page } from './styles';

// css, icon, image //
import 'assets/fonts/material-icon/css/material-design-iconic-font.min.css';
import 'assets/css/style.css';
import signupimg from 'assets/images/signup-image.jpg';

function SignIn() {
  return (
    <Page>
      <section class="signup mt-4">
        <div class="container">
          <div class="signup-content">
            <div class="signup-form">
              <h2 class="form-title">회원가입</h2>
              <form method="POST" class="register-form" id="register-form">
                <div class="form-group">
                  <label for="name">
                    <i class="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                  />
                </div>
                <div class="form-group">
                  <label for="email">
                    <i class="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                  />
                </div>
                <div class="form-group">
                  <label for="pass">
                    <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group">
                  <label for="re-pass">
                    <i class="zmdi zmdi-lock-outline"></i>
                  </label>
                  <input
                    type="password"
                    name="re_pass"
                    id="re_pass"
                    placeholder="Repeat your password"
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
    </Page>
  );
}

export default SignIn;
