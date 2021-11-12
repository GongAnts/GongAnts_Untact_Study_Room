import React from 'react';
import { useSelector } from 'react-redux';

import { Route, Switch, Redirect } from 'react-router-dom';

// css //
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
// import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
import './assets/css/demo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import 'antd/dist/antd.css';

import AdminLayout from 'layouts/Admin.js';
import SignIn from 'layouts/SignIn.js';
import SignUp from 'layouts/SignUp.js';
import AddSchedule from 'views/Calendar/AddSchedule';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Switch>
      {console.log(isAuthenticated)}
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/signup" component={SignUp} />
      <Route exact path="/">
        {isAuthenticated ? <Redirect to="/admin/dashboard" /> : <SignIn />}
      </Route>
      <Route path="/addschedule" component={AddSchedule} />
    </Switch>
  );
};

export default App;
