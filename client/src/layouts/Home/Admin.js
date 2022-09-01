import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, Route, Switch } from 'react-router-dom';

import AdminNavbar from 'components/Navbars/AdminNavbar';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import RoomEnter from 'views/Room/RoomEnter';
import { GlobalContext } from 'hooks/useGlobalContext';
import { SwitchButton } from './styles';

import routes from 'routes.js';

import sidebarImage from 'assets/img/sidebar-3.jpg';

function Admin() {
  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState('black');
  const [hasImage, setHasImage] = useState(false);
  const location = useLocation();
  const mainPanel = useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            exact
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
      var element = document.getElementById('bodyClick');
      element.parentNode.removeChild(element);
    }
  }, [location]);

  const { theme, themeSwitchHandler } = useContext(GlobalContext);

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <div className="wrapper relative">
        <div
          className="drawer"
          style={{ boxShadow: '6px 4px 5px 3px #EAEEF1', padding: '0' }}
        >
          <AdminNavbar />
        </div>
        <div className="flex h-max mt-2" ref={mainPanel}>
          <div className="flex-initial h-max">
            <Sidebar
              color={color}
              image={hasImage ? image : ''}
              routes={routes}
            />
          </div>
          <div className="flex-initial w-4/5">
            <Switch>
              {getRoutes(routes)}
              <Route path={`/admin/room/:id`} exact component={RoomEnter} />
            </Switch>
            <input type="checkbox" />
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
