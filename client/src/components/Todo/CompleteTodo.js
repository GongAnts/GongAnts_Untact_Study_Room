import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TODO_TODAY_REQUEST, TODO_CHECK_REQUEST } from 'redux/types';

// UI Components //
import Checkbox from '@mui/material/Checkbox';

function CompleteTodo({ complete }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { todoToday } = useSelector((state) => state.todo);
  const incompleteTodo = todoToday.filter((todo) => todo.todo_check === 0);
  const completeTodo = todoToday.filter((todo) => todo.todo_check === 1);

  function onSubmit(todo_id) {
    const body = {
      todo_id: String(todo_id),
    };

    dispatch({
      type: TODO_CHECK_REQUEST,
      payload: body,
    });
    history.go(0);
  }

  useLayoutEffect(() => {
    dispatch({
      type: TODO_TODAY_REQUEST,
    });
    console.log(todoToday);
  }, [dispatch]);

  if (complete === 0) {
    return (
      <>
        <div>
          {incompleteTodo.map((todo) => {
            return (
              <div key={todo.todo_id} className="">
                <div className="flex">
                  <Checkbox onChange={() => onSubmit(todo.todo_id)} />
                  <div className="p-2">{todo.todo_title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          {completeTodo.map((todo) => {
            return (
              <div key={todo.todo_id} className="">
                <div className="flex">
                  <Checkbox
                    defaultChecked
                    onChange={() => onSubmit(todo.todo_id)}
                  />
                  <div className="p-2">{todo.todo_title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default CompleteTodo;
