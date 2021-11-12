import {
  SCHEDULE_LOADING_REQUEST,
  SCHEDULE_LOADING_SUCCESS,
  SCHEDULE_LOADING_FAILURE,
  SCHEDULE_WRITE_REQUEST,
  SCHEDULE_WRITE_SUCCESS,
  SCHEDULE_WRITE_FAILURE,
  SCHEDULE_DELETE_REQUEST,
  SCHEDULE_DELETE_SUCCESS,
  SCHEDULE_DELETE_FAILURE,
  SCHEDULE_UPDATE_REQUEST,
  SCHEDULE_UPDATE_SUCCESS,
  SCHEDULE_UPDATE_FAILURE,
  SCHEDULE_EDIT_POPUP,
  SCHEDULE_ISFILTER,
  SCHEDULE_FILTERTHISMONTH,
} from 'redux/types';
import { createAction } from '@reduxjs/toolkit';

const initialState = {
  fullSchedule: [],
  thisMonthSchedule: [],
  thisMonth: [],
  isOpenEditPopup: false,
  currentSchedule: null,
  isFilter: false,
};

const schedulereducer = (state = initialState, action) => {
  switch (action.type) {
    case SCHEDULE_EDIT_POPUP:
      return {
        ...state,
        isOpenEditPopup: action.payload.isOpen,
        currentSchedule: action.payload.schedule,
      };
    case SCHEDULE_ISFILTER:
      return {
        ...state,
        isFilter: action.payload,
      };
    case SCHEDULE_FILTERTHISMONTH:
      return {
        ...state,
        thisMonth: state.fullSchedule.filter((sc, idx) => {
          if (state.isFilter) {
            return (
              parseInt(sc.date) >= parseInt(payload.startDay) &&
              parseInt(sc.date) <= parseInt(payload.endDay) &&
              sc.completed === true
            );
          } else {
            return (
              parseInt(sc.date) >= parseInt(payload.startDay) &&
              parseInt(sc.date) <= parseInt(payload.endDay)
            );
          }
        }),
      };
    case SCHEDULE_WRITE_SUCCESS:
      return {
        ...state,
        fullSchedule: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export const setIsFilter = createAction('SCHEDULE_ISFILTER');
export const openEditPopup = createAction('SCHEDULE_EDIT_POPUP');

export default schedulereducer;
