import React from 'react';
import AddTodo from 'components/Todo/AddTodo';
import InCompleteTodo from 'components/Todo/InCompleteTodo';

// UI components //
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function TodoList() {
  return (
    <div className="w-full flex justify-center">
      <h3 className="text-2xl">Today TodoList</h3>
      <div className="flex justify-center space-x-10 mt-3 w-2/3">
        <div className="w-2/5">
          <div>
            <span>🌑 미완료</span>
            <AddTodo />
          </div>
          <div>
            <InCompleteTodo />
          </div>
        </div>
        <div className="w-2/5">
          <span>🌕 완료</span>
          <MoreHorizIcon className="text-2xl ml-4 mb-1"></MoreHorizIcon>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
