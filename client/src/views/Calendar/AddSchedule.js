import React, { useState } from 'react';
import Datepicker from './Datepicker';

// UI Components //
import { LeftOutlined } from '@ant-design/icons';
import TextField from '@mui/material/TextField';

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
  const [priority, setPriority] = useState('중');
  const dispatch = useDispatch();

  const checkValid = () => {
    if (title.length === 0 || title.trim().length === 0) {
      setTitleError(true);
      return true;
    }
    return false;
  };

  // 스케줄 추가하기
  const onAddSchedule = () => {
    const yyyymmdd = date.split('T')[0];
    const time = date.split('T')[1];
    const data = {
      date: yyyymmdd,
      time,
      title,
      description,
      check: '0',
      priority,
    };

    if (checkValid() == false) {
      // console.log(data);
      dispatch({
        type: SCHEDULE_WRITE_REQUEST,
        payload: data,
      });
      window.location.href = '/admin/calendar';
    } else {
      console.log(titleError);
    }
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
        <TextField
          className="w-64"
          id={`standard-basic ${titleError && 'standard-error'}`}
          label="일정 제목"
          variant="standard"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {titleError ? (
          <p className="font-light text-xs">일정 제목을 입력해주세요</p>
        ) : (
          <></>
        )}
        <br />
        <Datepicker setDate={setDate} date={date} />
        <select
          className="select w-64 mt-4"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
          }}
        >
          <option disabled selected>
            중요도를 선택하세요
          </option>
          <option value="상">상</option>
          <option value="중">중</option>
          <option value="하">하</option>
        </select>
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
