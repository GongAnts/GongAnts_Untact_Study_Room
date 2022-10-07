import React from 'react';

import AdminNavbar from 'components/Navbars/AdminNavbar';
import { pointColor } from 'styles/color';

// UI Components //
import Avatar from 'assets/img/Default-Profile.png';

export default function Profile() {
  return (
    <>
      <div
        className="drawer"
        style={{ boxShadow: '6px 4px 5px 3px #EAEEF1', padding: '0' }}
      >
        <AdminNavbar />
      </div>
      <div className="flex justify-center">
        <div className="flex w-4/5">
          <div className="w-1/3 mt-5">
            <img src={Avatar} style={{ width: '220px' }} />
          </div>
          <div className="w-2/3 mt-5">프로필</div>
        </div>
      </div>
    </>
  );
}
