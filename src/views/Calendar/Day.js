import React from 'react';

import { DayItem } from './styles';

const Day = ({ dateInfo, className }) => {
  return (
    <DayItem>
      <span className="title">{dateInfo.day}</span>
    </DayItem>
  );
};

export default Day;
