import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Day from './Day';

// style
import { CalendarWrap, Header, DateBody, Weekend, DOTW } from './styles';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

// import 'react-calendar/dist/Calendar.css';
// import Calendar from 'react-calendar';
import moment from 'moment';

function CalendarApp() {
  const [current, setCurrent] = useState(moment());

  const { thisMonth, isOpenEditPopup, isFilter } = useSelector(
    (state) => state.schedule,
  );

  const generate = () => {
    const startWeek = current.clone().startOf('month').week(); // 1년 주 계산
    const endWeek =
      current.clone().endOf('month').week() === 1
        ? 53
        : current.clone().endOf('month').week();

    // 날짜
    let calendar = [];

    for (let wk = startWeek; wk <= endWeek; wk++) {
      calendar.push(
        <Weekend key={wk}>
          {Array(7)
            .fill(0)
            .map((n, idx) => {
              const noFormatDate = current
                .clone()
                .startOf('year')
                .week(wk)
                .startOf('week')
                .add(idx, 'day');

              const day = noFormatDate.format('D');
              const fullDate = noFormatDate.format('l').replaceAll('.', '');
              const isToday =
                noFormatDate.format('YYYYMMDD') === moment().format('YYYYMMDD')
                  ? 'today'
                  : '';
              const isGrayed =
                noFormatDate.format('MM') === current.format('MM')
                  ? ''
                  : 'grayed';

              const currentSch = thisMonth.filter((s) => {
                return s.date === fullDate;
              });

              const dateInfo = { day, fullDate, dow: idx, currentSch };
              return (
                <Day
                  key={n + idx}
                  dateInfo={dateInfo}
                  className={`${isGrayed} ${isToday}`}
                />
              );
            })}
        </Weekend>,
      );
    }
    return calendar;
  };

  return (
    <div>
      <CalendarWrap>
        <Header>
          <LeftOutlined className="arrow" />
          <span className="month">09</span>
          <RightOutlined className="arrow" />
        </Header>
        <DateBody>
          <Weekend className="row">
            <DOTW style={{ color: '#ff4b4b' }}>
              <span>S</span>
            </DOTW>
            <DOTW>
              <span>M</span>
            </DOTW>
            <DOTW>
              <span>T</span>
            </DOTW>
            <DOTW>
              <span>W</span>
            </DOTW>
            <DOTW>
              <span>T</span>
            </DOTW>
            <DOTW>
              <span>F</span>
            </DOTW>
            <DOTW style={{ color: '#4b87ff' }}>
              <span>S</span>
            </DOTW>
            {generate()}
          </Weekend>
        </DateBody>
      </CalendarWrap>
    </div>
  );
}

export default CalendarApp;
