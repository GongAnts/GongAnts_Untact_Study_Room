import React, { Component } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

import { Nav } from 'react-bootstrap';
import { groundColor, whiteColor } from 'styles/color';

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  };
  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: groundColor }}
    >
      {/* <label for="my-drawer-2" class="drawer-overlay"></label> */}
      <ul className="p-4 w-72" style={{ height: '50vh' }}>
        {routes.map((prop, key) => {
          if (!prop.redirect)
            return (
              <li
                className={
                  prop.upgrade
                    ? 'active active-pro'
                    : activeRoute(prop.layout + prop.path)
                }
                key={key}
                style={{
                  width: '250px',
                  backgroundColor: whiteColor,
                  height: '65px',
                  marginTop: '16px',
                  borderRadius: '50px',
                  padding: '20px 25px',
                }}
              >
                <NavLink to={prop.layout + prop.path} className="nav-link">
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          return null;
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
