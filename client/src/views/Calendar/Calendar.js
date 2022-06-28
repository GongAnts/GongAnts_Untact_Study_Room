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
  // readSchedule,
  setIsFilter,
  openEditPopup,
} from 'redux/reducers/schedulereducer';

import moment from 'moment';
import 'moment/locale/ko';

function CalendarApp({ history }) {
  const [current, setCurrent] = useState(moment());
  const { thisMonth, isOpenEditPopup, isFilter } = useSelector(
    (state) => state.schedule,
  );

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const startDay = current.clone().startOf('month').format('YYYYMMDDHHMM');
    const endDay = current.clone().endOf('month').format('YYYYMMDDHHMM');
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
        <div className="flex w-full" key={wk}>
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
        </div>,
      );
    }
    return calendar;
  };

  const onFilter = (isFilter) => {
    dispatch(setIsFilter(isFilter));
  };

  return (
    <div>
      <div className="relative">
        {isOpenEditPopup && <EditSchedule />}
        <div className="flex justify-center text-5xl items-center mt-1">
          <LeftOutlined className="arrow text-2xl" onClick={PrevMonth} />
          <span className="mx-36">{current.format('MM')}</span>
          <RightOutlined className="arrow text-2xl" onClick={NextMonth} />
        </div>
        <div className="flex flex-col mt-5">
          <div className="flex flex-row w-full">
            <div
              className="h-10 border-b-4 w-1/5 text-center"
              style={{ color: '#ff4b4b' }}
            >
              <span>S</span>
            </div>
            <div className="h-10 border-b-4 w-1/5 text-center">
              <span>M</span>
            </div>
            <div className="h-10 border-b-4 w-1/5 text-center">
              <span>T</span>
            </div>
            <div className="h-10 border-b-4 w-1/5 text-center">
              <span>W</span>
            </div>
            <div className="h-10 border-b-4 w-1/5 text-center">
              <span>T</span>
            </div>
            <div className="h-10 border-b-4 w-1/5 text-center">
              <span>F</span>
            </div>
            <div
              className="h-10 border-b-4 w-1/5 text-center"
              style={{ color: '#4b87ff' }}
            >
              <span>S</span>
            </div>
          </div>
          {daygenerate()}
        </div>
      </div>
      <ButtonWrapper
        onClick={() => {
          dispatch(openEditPopup(true));
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
