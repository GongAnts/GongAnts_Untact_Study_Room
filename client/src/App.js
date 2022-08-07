/* External Libraries */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

// css //
import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'antd/dist/antd.css';

/* Internal Libraries */
import AdminLayout from 'layouts/Admin.js';
import SignIn from 'layouts/signin/SignIn.js';
import SignUp from 'layouts/signup/SignUp.js';
import AddSchedule from 'views/Calendar/AddSchedule';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route exact path="/">
        {isAuthenticated ? <Redirect to="/admin/dashboard" /> : <SignIn />}
      </Route>
      <Route path="/addschedule" component={AddSchedule} />
    </Switch>
  );
};

export default App;
