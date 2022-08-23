import React, { useState, useLayoutEffect } from 'react';

// react-bootstrap components
import { Badge, Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import io from 'socket.io-client';

import { TODO_WRITE_REQUEST, TODO_TODAY_REQUEST } from 'redux/types';

let roomName;

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

  // const dispatch = useDispatch();
  // const onSubmit = async (e) => {
  //   await e.preventDefault();
  //   const { todo_title } = form;
  //   const body = { todo_title };

  //   dispatch({
  //     type: TODO_WRITE_REQUEST,
  //     payload: body,
  //   });
  // };

  // const onHandleCheck = (todo_id) => {
  //   const body = { todo_id };

  //   dispatch({
  //     type: TODO_CHECK,
  //     payload: body,
  //   });
  //   req.history.go(0);
  // };

  async function onEnterRoom(values) {
    roomName = values['room-name'];
    window.location.replace(`room/${roomName}`);
  }

  // useLayoutEffect(() => {
  //   dispatch({
  //     type: TODO_TODAY_REQUEST,
  //   });
  // }, [dispatch]);

  return (
    <>
      <Container>
        <Form
          className="grid text-center place-content-center h-max m-40"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onEnterRoom}
          autoComplete="off"
        >
          <Form.Item
            className="text-center w-50"
            label="방 아이디를 입력하세요."
            name="room-name"
            rules={[
              {
                required: true,
                message: '방 아이디를 입력해주세요!',
              },
            ]}
          >
            <input
              type="text"
              class="input input-bordered w-64 max-w-xs mt-4"
            />
          </Form.Item>

          <Form.Item
            className="mt-3"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <button class="btn btn-outline btn-primary w-64" htmlType="submit">
              Submit
            </button>
          </Form.Item>
        </Form>
      </Container>
    </>
  );
}

export default Room;
