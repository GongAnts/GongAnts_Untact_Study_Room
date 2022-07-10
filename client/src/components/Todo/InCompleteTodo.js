import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TODO_TODAY_REQUEST } from 'redux/types';

function InCompleteTodo() {
  const dispatch = useDispatch();
  const { todoToday } = useSelector((state) => state.todo);
  const onSubmit = async (e) => {
    await e.preventDefault();
    const body = {
      todo_title: todo,
    };
    console.log(body);

    dispatch({
      type: TODO_WRITE_REQUEST,
      payload: body,
    });
  };

  useLayoutEffect(() => {
    dispatch({
      type: TODO_TODAY_REQUEST,
    });
    console.log(todoToday);
  }, [dispatch]);

  return (
    <>
      <div>
        {todoToday.map((todo) => {
          return (
            <div
              key={todo.todo_id}
              className="card min-h-min bg-base-100 shadow-lg"
            >
              <div className="flex">
                <div className="flex-1 p-4">{todo.todo_title}</div>
                <div className="flex justify-end">
                  <button className="inline btn btn-outline m-1">완료</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default InCompleteTodo;
