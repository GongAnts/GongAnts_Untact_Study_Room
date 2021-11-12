import React, { useState, useEffect } from 'react';

// react-bootstrap components
import { Badge, Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import { TodoArea, CardArea } from './styles';
import { useDispatch } from 'react-redux';

import { FaUserCircle } from 'react-icons/fa';
import { Checkbox, Card } from 'antd';

import { TODO_WRITE_REQUEST, TODO_TODAY_REQUEST } from 'redux/types';

function Room() {
  const [form, setform] = useState({
    todo_title: '',
  });

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const onTextchange = (e) => {
    setform({
      ...form,
      todo_title: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    await e.preventDefault();
    const { todo_title } = form;
    const body = { todo_title };
    console.log(body);

    dispatch({
      type: TODO_WRITE_REQUEST,
      payload: body,
    });
  };

  return (
    <>
      <Container fluid>
        <CardArea>
          <Col md="2">
            <FaUserCircle style={{ fontSize: '9em' }} />
          </Col>
          <Col md="4">
            <Card title="To Do List" extra={<a href="#">More</a>}>
              <div className="mt-5 ms-5">
                <p>
                  <Checkbox onChange={onChange}>할 일1</Checkbox>
                </p>
              </div>
              <TodoArea>
                <form>
                  <TextField
                    id="standard-basic"
                    label="To do"
                    variant="standard"
                    placeholder="Wrtie To do"
                    sx={{ width: '27ch' }}
                    onChange={onTextchange}
                  />

                  <Button
                    type="primary"
                    className="save mt-3"
                    onClick={onSubmit}
                  >
                    저장
                  </Button>
                </form>
              </TodoArea>
            </Card>
          </Col>
        </CardArea>
        <Col md="2">
          <FaUserCircle style={{ fontSize: '9em' }} />
        </Col>
        <Col md="4">
          <Card title="To Do List" extra={<a href="#">More</a>}>
            <div className="mt-5 ms-5">
              <p>
                <Checkbox onChange={onChange}>할 일1</Checkbox>
              </p>
            </div>
          </Card>
        </Col>
      </Container>
    </>
  );
}

export default Room;
