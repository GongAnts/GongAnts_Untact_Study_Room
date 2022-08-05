import Dashboard from 'views/Dashboard.js';
import Room from 'views/Room/Room';
import CalendarApp from 'views/Calendar/Calendar.js';
import Memo from 'views/Memo/Memo';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-chart-pie-35',
    component: Dashboard,
    layout: '/admin',
  },
  // {
  //   path: '/user',
  //   name: 'User Profile',
  //   icon: 'nc-icon nc-circle-09',
  //   component: UserProfile,
  //   layout: '/admin',
  // },
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
];

export default dashboardRoutes;
