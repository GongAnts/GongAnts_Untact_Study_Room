import React, { useState, useLayoutEffect } from 'react';

// react-bootstrap components
import { Badge, Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { Button, Radio } from 'antd';
import { TodoArea, CardArea } from './styles';
import { useDispatch, useSelector } from 'react-redux';

import { FaUserCircle } from 'react-icons/fa';
import { Checkbox, Card } from 'antd';

import {
  TODO_WRITE_REQUEST,
  TODO_TODAY_REQUEST,
  TODO_CHECK,
} from 'redux/types';

function Room(req) {
  const [form, setform] = useState({
    todo_title: '',
  });
  const { todoToday } = useSelector((state) => state.todo);

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

    dispatch({
      type: TODO_WRITE_REQUEST,
      payload: body,
    });
  };

  const onHandleCheck = (todo_id) => {
    const body = { todo_id };

    dispatch({
      type: TODO_CHECK,
      payload: body,
    });
    req.history.go(0);
  };

  const arrTodo = todoToday.map((todo, idx) => {
    const status = todo.todo_check;
    return (
      <p key={idx}>
        <Radio
          onClick={() => onHandleCheck(todo.todo_id)}
          style={{ marginTop: '18px' }}
          checked={status === 1}
        >
          {todo.todo_title}
        </Radio>
      </p>
    );
  });

  useLayoutEffect(() => {
    dispatch({
      type: TODO_TODAY_REQUEST,
    });
  }, [dispatch]);

  return (
    <>
      <Container fluid>
        <CardArea>
          <Col md="2">
            <FaUserCircle style={{ fontSize: '9em' }} />
          </Col>
          <Col md="4">
            <Card title="To Do List" extra={<a href="/admin/todo">More</a>}>
              {arrTodo}
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
      </Container>
    </>
  );
}

export default Room;
