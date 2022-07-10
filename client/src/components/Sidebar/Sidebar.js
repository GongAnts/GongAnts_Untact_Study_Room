import React, { Component } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

import { Nav } from 'react-bootstrap';

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  };
  return (
    <div>
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-base-100" style={{ height: '50vh' }}>
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
