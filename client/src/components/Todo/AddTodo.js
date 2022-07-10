import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// UI components //
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

import { TODO_WRITE_REQUEST } from 'redux/types';

function AddTodo() {
  const [isClick, setIsClick] = useState(false);
  const [todo, setTodo] = useState();

  const onClickChange = () => {
    setIsClick(true);
  };

  const onTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const dispatch = useDispatch();
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

  return (
    <>
      <AddIcon
        className="text-2xl ml-4 mb-1 cursor-pointer"
        onClick={onClickChange}
      ></AddIcon>
      <br />
      {isClick ? (
        <div className="flex mt-3">
          <input
            type="text"
            name="todo"
            placeholder="입력"
            class="input input-bordered w-5/6 max-w-xs"
            onChange={onTodoChange}
          />
          <button class="btn btn-ghost" onClick={onSubmit}>
            <CheckIcon></CheckIcon>
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default AddTodo;
