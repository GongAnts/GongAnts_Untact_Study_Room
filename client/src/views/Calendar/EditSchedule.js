import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { MdChevronLeft } from 'react-icons/md';
import Datepicker from './Datepicker';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField, makeStyles, ButtonGroup } from '@material-ui/core';
import { SCHEDULE_DELETE_REQUEST, SCHEDULE_UPDATE_REQUEST } from 'redux/types';
import { openEditPopup } from 'redux/reducers/schedulereducer';

const EditSchedule = ({ history }) => {
  const dispatch = useDispatch();
  const { currentSchedule } = useSelector((state) => state.schedule);

  const d = currentSchedule.date;
  const t = currentSchedule.time;
  const [date, setDate] = useState(
    d.slice(0, 4) +
      '-' +
      d.slice(4, 6) +
      '-' +
      d.slice(6) +
      'T' +
      t.slice(0, 2) +
      ':' +
      t.slice(2),
  );
  const inputTitle = useRef();
  const inputDescription = useRef();
  const [titleError, setTitleError] = useState(false);

  const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 250,
      textAlign: 'center',
    },
  }));

  const classes = useStyles();

  const onSave = () => {
    if (checkValid()) {
      const yyyymmdd = date.split('T')[0].replaceAll('-', '');
      const time = date.split('T')[1].replaceAll(':', '');
      const title = inputTitle.current.value;
      const description = inputDescription.current.value;

      const data = {
        date: yyyymmdd,
        time,
        title,
        description,
        id: currentSchedule.id,
      };

      dispatch(updateSchedule(data));
      dispatch(openEditPopup(false));
    }
  };

  const checkValid = () => {
    const title = inputTitle.current.value;

    if (title.length === 0 || title.trim().length === 0) {
      setTitleError(true);
      return false;
    }

    return true;
  };

  const onComplete = () => {
    const data = { ...currentSchedule, completed: true };
    dispatch(openEditPopup(false));
    dispatch({
      type: SCHEDULE_UPDATE_REQUEST,
      payload: data,
    });
  };

  const onDelete = () => {
    dispatch(openEditPopup(false));
    dispatch({
      type: SCHEDULE_DELETE_REQUEST,
      payload: currentSchedule.id,
    });
  };

  return (
    <Popup>
      <Header>
        <MdChevronLeft
          onClick={() => {
            dispatch(openEditPopup(false));
          }}
        />
        ?????? ?????? &nbsp;&nbsp;&nbsp;
        <i />
      </Header>
      <Body>
        <Datepicker setDate={setDate} date={date} />
        <TextField
          id="standard-basic"
          label="?????? ????????? ??????????"
          defaultValue={currentSchedule.title}
          error={titleError}
          className={classes.textField}
          inputRef={inputTitle}
          onChange={(e) => {
            //setTitle(e.target.value);
          }}
        />
        <TextField
          id="outlined-multiline-static"
          label="?????? ??????"
          multiline
          defaultValue={currentSchedule.description}
          inputRef={inputDescription}
          className={classes.textField}
          rows={4}
          variant="outlined"
          onChange={(e) => {
            //setDescription(e.target.value);
          }}
        />
        <ButtonGroup
          color="secondary"
          aria-label="outlined secondary button group"
        >
          <Button disabled={currentSchedule.completed} onClick={onComplete}>
            ??????
          </Button>
          <Button onClick={onSave}>??????</Button>
          <Button onClick={onDelete}>??????</Button>
        </ButtonGroup>
      </Body>
    </Popup>
  );
};

const Popup = styled.div`
  position: fixed;
  background-color: #fff3f3;
  transition: all 1s easy;
  box-shadow: 5px 10px 20px gray;
  border-radius: 20px;
  /* Mobile Device */
  @media screen and (max-width: 767px) {
    width: 100%;
    top: 0;
    height: 100%;
    box-shadow: none;
    border-radius: 0px;
  }
  /* Tablet Device */
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 350px;
    top: 5vh;
    left: 32vw;
    height: 80vh;
  }
  /* Desktop Device */
  @media screen and (min-width: 992px) {
    top: 5vh;
    left: 38vw;
    width: 25vw;
    height: 80vh;
  }
`;
const Header = styled.div`
  height: 7vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px;
  font-size: 1.5em;
  & * {
    color: #cccccc;
  }
  & > svg {
    cursor: pointer;
  }
`;

const Body = styled.div`
  padding-top: 6vh;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
export default EditSchedule;
