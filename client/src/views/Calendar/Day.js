import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openEditPopup } from 'redux/reducers/modules/calendar';
import CalendarEditModal from 'components/Calendar/CalendarEditModal';

import { baseColor, pointColor } from '../../styles/color';
import { D, Plan, PlanArea } from './styles';

const Day = ({ dateInfo, className }) => {
  const [openModal, setOpenModal] = useState(false);

  // const dispatch = useDispatch();
  const schedule = dateInfo.daySch;

  schedule.sort((a, b) => a.time - b.time);

  const PlanList = schedule.map((s, idx) => {
    return (
      <PlanArea
        key={idx}
        color={pointColor}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <Plan for={`modal${idx}`} className="text-center w-full" data={s}>
          {s.schedule_title}
        </Plan>
        {openModal && (
          <CalendarEditModal
            idx={idx}
            setOpenModal={setOpenModal}
            openModal={openModal}
            schedule_id={s.schedule_id}
            schedule_title={s.schedule_title}
            schedule_date={s.schedule_date}
            schedule_description={s.schedule_description}
          />
        )}
      </PlanArea>
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
