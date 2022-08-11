/* External Libraries */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

// css //
import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'antd/dist/antd.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pointColor } from 'styles/color';

/* Internal Libraries */
import AdminLayout from 'layouts/Admin.js';
import SignIn from 'layouts/signin/SignIn.js';
import SignUp from 'layouts/signup/SignUp.js';
import AddSchedule from 'views/Calendar/AddSchedule';

// Theme //
const theme = createTheme({
  palette: {
    point: {
      main: pointColor,
    },
  },
});

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route exact path="/">
          {isAuthenticated ? (
            <Redirect to="/admin/dashboard" />
          ) : (
            <Redirect to="/signin" />
          )}
        </Route>
        <Route path="/addschedule" component={AddSchedule} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
