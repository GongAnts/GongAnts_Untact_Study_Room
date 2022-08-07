import React from 'react';
import { useDispatch } from 'react-redux';
import { openEditPopup } from 'redux/reducers/modules/calendar';

import { baseColor, pointColor } from "../../styles/color";
import styled from 'styled-components';

const Day = ({ dateInfo, className }) => {
  const dispatch = useDispatch();
  const schedule = dateInfo.daySch;
  console.log(schedule);

  // 팝업을 연다.
  const openPopup = (schedule) => {
    dispatch(openEditPopup({ isOpen: true, schedule }));
  };
  schedule.sort((a, b) => a.time - b.time);

  const PlanList = schedule.map((s, idx) => {
    return (
      <Plan
        className="text-center"
        key={idx}
        data={s}
        color={pointColor}
        onClick={() => {
          openPopup(s);
        }}
      >
        {s.schedule_title}
      </Plan>
    );
  });

  return (
    <D className="h-24 w-1/4 p-2">
      <span className="day_title">{dateInfo.day}</span>
      {PlanList}
    </D>
  );
};

export default Day;

const D = styled.div`
  padding-top: 4px;
  height: 12vh;
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: hidden;
  &.grayed {
    color: gray;
  }
  &.today > .title {
    color: white;
    background-color: skyblue;
  }
  & > .title {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
`;

const Plan = styled.span`
  text-align: center;
  background-color: ${(props) => props.color};
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1px 0;
  height: 20px;
  width: 100%;
  border-radius: 7px;
  color: white;
  cursor: pointer;
  &.completed {
    background-color: #bfbfbf;
  }
`;