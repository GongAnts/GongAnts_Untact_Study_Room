import React, { useState, useLayoutEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Day from './Day';
import EditSchedule from './EditSchedule';

// style
import {
  CalendarWrap,
  Header,
  DateBody,
  Weekend,
  DOTW,
  ButtonWrapper,
} from './styles';
import { MdCheck, MdDoneAll, MdEdit, MdDehaze } from 'react-icons/md';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  readSchedule,
  setIsFilter,
  openEditPopup,
} from 'redux/reducers/modules/calendar';

import moment from 'moment';
import 'moment/locale/ko';

function CalendarApp({ history }) {
  const [current, setCurrent] = useState(moment());
  const { thisMonth, isOpenEditPopup, isFilter } = useSelector(
    (state) => state.schedule,
  );

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const startDay = current.clone().startOf('month').format('YYYYMMDD');
    const endDay = current.clone().endOf('month').format('YYYYMMDD');
    // dispatch(readSchedule({ startDay, endDay }));
  }, [current, dispatch, isOpenEditPopup, isFilter]);

  const PrevMonth = () => {
    setCurrent(current.clone().subtract(1, 'month'));
  };

  const NextMonth = () => {
    setCurrent(current.clone().add(1, 'month'));
  };

  const goToAddSchedule = () => {
    history.push('/addSchedule');
  };

  const daygenerate = () => {
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

  const onFilter = (isFilter) => {
    // dispatch(setIsFilter(isFilter));
  };

  return (
    <div>
      <CalendarWrap>
        {isOpenEditPopup && <EditSchedule />}
        <Header>
          <LeftOutlined className="arrow" onClick={PrevMonth} />
          <span className="month">{current.format('MM')}</span>
          <RightOutlined className="arrow" onClick={NextMonth} />
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
            {daygenerate()}
          </Weekend>
        </DateBody>
      </CalendarWrap>
      <ButtonWrapper
        onClick={() => {
          dispatch(openEditPopup(false));
        }}
      >
        {isFilter ? (
          <MdCheck
            onClick={() => onFilter(false)}
            className={'filterBtn subBtn'}
          />
        ) : (
          <MdDoneAll
            onClick={() => onFilter(true)}
            className={'filterBtn subBtn'}
          />
        )}
        <MdEdit onClick={goToAddSchedule} className={'writeBtn subBtn'} />
        <MdDehaze className={'menuBtn'} />
      </ButtonWrapper>
    </div>
  );
}

export default CalendarApp;
