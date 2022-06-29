import React from 'react';
import { useDispatch } from 'react-redux';
import { openEditPopup } from 'redux/reducers/modules/calendar';

const Day = ({ dateInfo, className }) => {
  const dispatch = useDispatch();
  const schedule = dateInfo.currentSch;

  const openPopup = (schedule) => {
    dispatch(openEditPopup({ isOpen: true, schedule }));
  };
  schedule.sort((a, b) => a.time - b.time);

  const PlanList = schedule.map((s, idx) => {
    return (
      <span
        className="text-center"
        key={idx}
        data={s}
        onClick={() => {
          openPopup(s);
        }}
      >
        {s.title}
      </span>
    );
  });

  return (
    <div className="flex justify-center h-24 w-1/4 p-2">
      <span className="day_title">{dateInfo.day}</span>
      {PlanList}
    </div>
  );
};

export default Day;
