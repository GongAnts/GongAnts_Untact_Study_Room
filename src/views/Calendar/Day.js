import React from 'react';
import { useDispatch } from 'react-redux';
import { openEditPopup } from 'redux/reducers/modules/calendar';

import { Plan, DayItem } from './styles';

const Day = ({ dateInfo, className }) => {
  const dispatch = useDispatch();
  const schedule = dateInfo.currentSch;

  const openPopup = (schedule) => {
    dispatch(openEditPopup({ isOpen: true, schedule }));
  };
  schedule.sort((a, b) => a.time - b.time);

  const PlanList = schedule.map((s, idx) => {
    return (
      <Plan
        key={idx}
        data={s}
        onClick={() => {
          openPopup(s);
        }}
      >
        {s.title}
      </Plan>
    );
  });
  return (
    <DayItem>
      <span className="day_title">{dateInfo.day}</span>
      {PlanList}
    </DayItem>
  );
};

export default Day;
