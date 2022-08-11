/* External Libraries */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

// css //
import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'antd/dist/antd.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pointColor, baseColor, mainColor, serveColor } from 'styles/color';

/* Internal Libraries */
import AdminLayout from 'layouts/Admin.js';
import SignIn from 'layouts/signin/SignIn.js';
import SignUp from 'layouts/signup/SignUp.js';
import AddSchedule from 'views/Calendar/AddSchedule';
import PrivateRoute from 'components/Auth/PrivateRoute';

// Theme //
const theme = createTheme({
  palette: {
    point: {
      main: pointColor,
    },
    base: {
      main: baseColor,
    },
    main: {
      main: mainColor,
    },
    serve: {
      main: serveColor,
    },
  },
});

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Route path="/auth/signup" component={SignUp} />
        <Route path="/auth/signin" component={SignIn} />
        <Route exact path="/">
          {isAuthenticated ? <Redirect to="/admin/dashboard" /> : <SignIn />}
        </Route>
        <Route path="/addschedule" component={AddSchedule} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
