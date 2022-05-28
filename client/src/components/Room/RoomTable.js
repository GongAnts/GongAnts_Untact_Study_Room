import React from 'react';

function RoomTable({ userName }) {
  return (
    <div className="overflow-x-auto w-5/12 pr-3 inline-block float-left">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="text-4xl" colSpan={'2'}>
              {userName}님의 방
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover">
            <td>취준</td>
            <td>취뽀합시다~</td>
          </tr>
          <tr className="hover">
            <td>정처기</td>
            <td>정처기 실기 공부</td>
          </tr>
          <tr className="hover">
            <td>토익</td>
            <td>토익 공부!</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RoomTable;
