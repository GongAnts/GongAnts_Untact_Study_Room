import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// UI components //
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

import { TODO_WRITE_REQUEST } from 'redux/types';

function AddTodo() {
  const [isClick, setIsClick] = useState(false);
  const [todo, setTodo] = useState();
  const { user_id } = useSelector((state) => state.auth);

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
      user_id: user_id,
      todo_title: todo,
    };

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
            placeholder="입력"
            class="input input-bordered w-5/6 max-w-xs"
            onChange={onTodoChange}
          />
          <button type="submit" class="btn btn-ghost" onSubmit={onSubmit}>
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
