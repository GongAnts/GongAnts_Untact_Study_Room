import React from 'react';
import AddTodo from 'components/Todo/AddTodo';
import InCompleteTodo from 'components/Todo/InCompleteTodo';

// UI components //
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function TodoList() {
  return (
    <div className="ml-3">
      <h3 className="text-3xl">μ€λμ TodoList</h3>
      <div className="flex mt-3">
        <div className="flex-1">
          <div>
            <span>π λ―Έμλ£</span>
            <AddTodo />
          </div>
          <div>
            <InCompleteTodo />
          </div>
        </div>
        <div className="flex-1">
          <span>π μλ£</span>
          <MoreHorizIcon className="text-2xl ml-4 mb-1"></MoreHorizIcon>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
