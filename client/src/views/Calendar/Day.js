import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openEditPopup } from 'redux/reducers/modules/calendar';
import CalendarEditModal from 'components/Calendar/CalendarEditModal';

import { baseColor, pointColor } from '../../styles/color';
import { D, Plan } from './styles';

const Day = ({ dateInfo, className }) => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const schedule = dateInfo.daySch;

  schedule.sort((a, b) => a.time - b.time);

  const PlanList = schedule.map((s, idx) => {
    return (
      <p key={idx}>
        <Plan
          for={`modal${idx}`}
          className="text-center"
          data={s}
          color={pointColor}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          {s.schedule_title}
        </Plan>
        {console.log(openModal)}
        {openModal && (
          <CalendarEditModal idx={idx} setOpenModal={setOpenModal} />
        )}
      </p>
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
