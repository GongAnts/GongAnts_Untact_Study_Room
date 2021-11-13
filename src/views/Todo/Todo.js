import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card, Radio, Divider } from 'antd';
import { SmallDashOutlined } from '@ant-design/icons';
import { Content, ContentSecond, Title } from './styles';

import { TODO_LOAD_REQUEST, TODO_CHECK } from 'redux/types';

function Todo(req) {
  const dispatch = useDispatch();
  const { fullTodo } = useSelector((state) => state.todo);

  const onHandleCheck = (todo_id) => {
    const body = { todo_id };

    dispatch({
      type: TODO_CHECK,
      payload: body,
    });
    req.history.go(0);
  };

  const arrTodoReady = fullTodo.filter((todo) => todo.todo_check === 0);
  const setTodoReady = arrTodoReady.map((todo, idx) => {
    const todoID = todo.todo_id;
    return (
      <Card
        size="small"
        hoverable
        style={{ width: 400, marginTop: '10px' }}
        cover={null}
        key={idx}
      >
        <Radio
          onClick={() => onHandleCheck(todoID)}
          style={{ marginTop: '18px' }}
        >
          {todo.todo_title}
        </Radio>
      </Card>
    );
  });

  const arrTodoFinish = fullTodo.filter((todo) => todo.todo_check === 1);
  const setTodoFinish = arrTodoFinish.map((todo, idx) => {
    const todoID = todo.todo_id;
    return (
      <Card
        size="small"
        hoverable
        style={{ width: 400, marginTop: '10px' }}
        cover={null}
        key={idx}
      >
        <Radio
          onClick={() => onHandleCheck(todoID)}
          style={{ marginTop: '18px' }}
          defaultChecked
        >
          {todo.todo_title}
        </Radio>
      </Card>
    );
  });

  useEffect(() => {
    dispatch({
      type: TODO_LOAD_REQUEST,
    });
  }, dispatch);

  return (
    <div>
      {console.log(req.history)}
      <h3 style={{ marginLeft: '40px' }}>My TodoList</h3>
      <Divider />

      <Content>
        <Title>
          <h5>🌑 미완료</h5>
          <SmallDashOutlined style={{ fontSize: '23px' }} />
        </Title>
        {setTodoReady}
      </Content>
      <ContentSecond>
        <Title>
          <h5 style={{ marginRight: '310px' }}>🌕 완료</h5>
          <SmallDashOutlined style={{ fontSize: '23px' }} />
        </Title>
        {setTodoFinish}
      </ContentSecond>
    </div>
  );
}

export default Todo;
