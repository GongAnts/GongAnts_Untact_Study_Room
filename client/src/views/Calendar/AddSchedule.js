import React, { useState } from 'react';
import Datepicker from './Datepicker';

import { LeftOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import moment from 'moment';
import { SCHEDULE_WRITE_REQUEST } from 'redux/types';

const AddSchedule = ({ history }) => {
  const [date, setDate] = useState(
    moment().format().split(':')[0] + ':' + moment().format().split(':')[1],
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const dispatch = useDispatch();

  const onAddSchedule = () => {
    const yyyymmdd = date.split('T')[0].replaceAll('-', '');
    const time = date.split('T')[1].replaceAll(':', '');
    const data = { date: yyyymmdd, time, title, description };
    console.log(data);
    dispatch({
      type: SCHEDULE_WRITE_REQUEST,
      payload: data,
    });
  };

  const checkValid = () => {
    if (title.length === 0 || title.trim().length === 0) {
      setTitleError(true);
      return false;
    }
    return true;
  };

  return (
    <div className="flex align-middle flex-col h-screen items-center">
      <div className="flex mt-10 pt-8 items-center w-56">
        <LeftOutlined
          className="flex-0"
          onClick={() => {
            history.goBack();
          }}
        />
        <div className="flex-2 text-2xl px-14">일정 추가</div>
      </div>
      <div className="flex flex-col pt-8 items-center justify-space w-2/5">
        <Datepicker setDate={setDate} date={date} />
        <textarea
          className="textarea mt-4"
          placeholder="어떤 일정이 있나요?"
          error={titleError ? titleError : false}
          cols={30}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></textarea>
        <textarea
          className="textarea mt-4"
          placeholder="상세 메모"
          rows={5}
          cols={30}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <button
          className="btn btn-outline w-64 mt-8"
          variant="contained"
          onClick={onAddSchedule}
        >
          + ADD
        </button>
      </div>
    </div>
  );
};

export default AddSchedule;
