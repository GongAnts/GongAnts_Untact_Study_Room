import React from 'react';
import { baseColor, serveColor, whiteColor } from 'styles/color';

function RoomTable({ userName }) {
  return (
    <div className="overflow-x-auto pr-3 w-full float-left flex justify-center">
      <div className="w-2/5 float-left">
        <p
          className="text-sm pl-3 h-9 leading-8"
          style={{ borderLeft: `4px solid ${baseColor}` }}
        >
          {userName}님과 성향이 비슷한 방
        </p>
        <table className="table table-compact w-full mt-1">
          <thead>
            <tr>
              <th className="text-4xl" style={{ backgroundColor: baseColor }}>
                방 아이디
              </th>
              <th className="text-4xl" style={{ backgroundColor: baseColor }}>
                방 이름
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <td>N018</td>
              <td>SQLD 자격증 시험 공부합니다.</td>
            </tr>
            <tr className="hover">
              <td>N100</td>
              <td>정처기 실기 공부</td>
            </tr>
            <tr className="hover">
              <td>N990</td>
              <td>토익 공부!</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-2/5 float-left ml-5 pl-2">
        <p
          className="text-sm pl-3 h-9 leading-8"
          style={{ borderLeft: `4px solid ${serveColor}` }}
        >
          {userName}님의 방
        </p>
        <table className="table table-compact w-full mt-1">
          <thead>
            <tr>
              <th
                className="text-4xl"
                style={{ backgroundColor: serveColor, color: whiteColor }}
              >
                방 아이디
              </th>
              <th
                className="text-4xl"
                style={{ backgroundColor: serveColor, color: whiteColor }}
              >
                방 이름
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <td>S019</td>
              <td>취뽀합시다~</td>
            </tr>
            <tr className="hover">
              <td>N100</td>
              <td>정처기 실기 공부</td>
            </tr>
            <tr className="hover">
              <td>N990</td>
              <td>토익 공부!</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoomTable;
