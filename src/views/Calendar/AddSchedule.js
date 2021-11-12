import React, { useState } from 'react';
import Datepicker from './Datepicker';

import { LeftOutlined } from '@ant-design/icons';
import { Wrapper, Head, Body } from './styles';
import { Button, Input } from 'antd';
const { TextArea } = Input;

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
    if (checkValid()) {
      const yyyymmdd = date.split('T')[0].replaceAll('-', '');
      const time = date.split('T')[1].replaceAll(':', '');
      const data = { date: yyyymmdd, time, title, description };

      dispatch({
        type: SCHEDULE_WRITE_REQUEST,
        payload: data,
      });

      history.push('/');
    }
  };

  const checkValid = () => {
    if (title.length === 0 || title.trim().length === 0) {
      setTitleError(true);
      return false;
    }

    return true;
  };
  return (
    <Wrapper>
      <Head>
        <LeftOutlined
          onClick={() => {
            history.goBack();
          }}
        />
        일정 추가 &nbsp;&nbsp;&nbsp;
        <i />
      </Head>
      <Body>
        <Datepicker setDate={setDate} date={date} />
        <TextArea
          id="standard-basic"
          label="어떤 일정이 있나요?"
          error={titleError}
          className="textarea"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextArea
          id="outlined-multiline-static"
          label="간단 메모"
          multiline
          rows={4}
          className="textarea"
          variant="outlined"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Button variant="contained" onClick={onAddSchedule}>
          + ADD
        </Button>
      </Body>
    </Wrapper>
  );
};

export default AddSchedule;
