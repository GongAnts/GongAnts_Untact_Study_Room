import React from 'react';
import { useSelector } from 'react-redux';

import { Route, Switch, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
import './assets/css/demo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import AdminLayout from 'layouts/Admin.js';
import SignIn from 'layouts/SignIn.js';
import SignUp from 'layouts/SignUp.js';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Switch>
      {console.log(isAuthenticated)}
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route
        path="/"
        render={() => {
          isAuthenticated ? (
            <Redirect to="/admin/dashboard" />
          ) : (
            <Redirect to="/signin" />
          );
        }}
      />
    </Switch>
  );
};

export default App;
