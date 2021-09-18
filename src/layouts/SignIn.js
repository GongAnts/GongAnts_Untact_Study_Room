import React from 'react';

// UI components //
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { Page } from './styles';

// css, icon, image //
import 'assets/fonts/material-icon/css/material-design-iconic-font.min.css';
import 'assets/css/style.css';
import signinimg from 'assets/images/signin-image.jpg';

function SignIn() {
  return (
    <Page>
      <section class="sign-in mt-4">
        <div class="container">
          <div class="signin-content">
            <div class="signin-image">
              <figure>
                <img src={signinimg} alt="sign in image" />
              </figure>
              <a href="/signup" class="signup-image-link">
                Create an account
              </a>
            </div>

            <div class="signin-form">
              <p>'공개미'에 온 것을 환영합니다.</p>
              <h2 class="form-title">로그인</h2>
              <form method="POST" class="register-form" id="login-form">
                <div class="form-group">
                  <label for="your_name">
                    <AccountBoxIcon></AccountBoxIcon>
                  </label>
                  <input
                    type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Your Name"
                  />
                </div>
                <div class="form-group">
                  <label for="your_pass">
                    <LockIcon></LockIcon>
                  </label>
                  <input
                    type="password"
                    name="your_pass"
                    id="your_pass"
                    placeholder="Password"
                  />
                </div>
                <FormGroup
                  class="form-group"
                  style={{ width: '100%', height: '30px' }}
                >
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Remember me"
                  />
                </FormGroup>
                <div class="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    class="form-submit"
                    value="Log in"
                  />
                </div>
              </form>
              <div class="social-login">
                <span class="social-label">Or login with</span>
                <ul class="socials">
                  <li>
                    <a href="#">
                      <i class="display-flex-center zmdi zmdi-google"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

export default SignIn;
