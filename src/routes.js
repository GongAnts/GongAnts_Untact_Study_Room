/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from 'views/Dashboard.js';
import UserProfile from 'views/UserProfile.js';
import Room from 'views/Room/Room';
import CalendarApp from 'views/Calendar/Calendar.js';
import Memo from 'views/Memo/Memo';
import Todo from 'views/Todo/Todo';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-chart-pie-35',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/user',
    name: 'User Profile',
    icon: 'nc-icon nc-circle-09',
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/room',
    name: 'Room',
    icon: 'nc-icon nc-tag-content',
    component: Room,
    layout: '/admin',
  },
  {
    path: '/calendar',
    name: 'Calendar',
    icon: 'nc-icon nc-time-alarm',
    component: CalendarApp,
    layout: '/admin',
  },
  {
    path: '/memo',
    name: 'Memo',
    icon: 'nc-icon nc-single-copy-04',
    component: Memo,
    layout: '/admin',
  },
  {
    path: '/todo',
    name: 'Todo',
    icon: 'nc-icon nc-single-copy-04',
    component: Todo,
    layout: '/admin',
  },
];

export default dashboardRoutes;
