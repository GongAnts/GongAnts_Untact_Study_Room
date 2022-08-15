import React, { useState, useLayoutEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Day from './Day';
import EditSchedule from './EditSchedule';

// style
import { ButtonWrapper } from './styles';
import { MdCheck, MdDoneAll, MdEdit, MdDehaze } from 'react-icons/md';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
// reducer
import { SCHEDULE_LOADING_REQUEST } from 'redux/types';
import { setIsFilter, openEditPopup } from 'redux/reducers/schedulereducer';

import moment from 'moment';
import 'moment/locale/ko';

function CalendarApp({ history }) {
  const [current, setCurrent] = useState(moment());
  const { thisMonth, isOpenEditPopup, isFilter, fullSchedule } = useSelector(
    (state) => state.schedule,
  );

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    var nowDate = String(current.clone().startOf('month').format('YYYYMM'));
    const year = nowDate.slice(0, 4);
    const month = nowDate.slice(4, 6);
    const body = {
      year: year,
      month: month,
    };
    dispatch({
      type: SCHEDULE_LOADING_REQUEST,
      payload: body,
    });
  }, []);

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

              // 날짜 스케줄 불러오기
              const daySch = fullSchedule?.filter((s) => {
                return (
                  s?.schedule_date.slice(0, 4) === fullDate.slice(0, 4) &&
                  s?.schedule_date.slice(5, 7) === fullDate.slice(4, 6) &&
                  s?.schedule_date.slice(8, 10) === fullDate.slice(6, 8)
                );
              });

              const dateInfo = { day, fullDate, dow: idx, daySch };
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

  if (!fullSchedule) return 'loading...';
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
