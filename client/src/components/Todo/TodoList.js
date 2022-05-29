import React from 'react';
import AddTodo from 'components/Todo/AddTodo';

// UI components //
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function TodoList() {
  return (
    <div className="ml-3">
      <h3 className="text-3xl">TodoList</h3>
      <div className="flex mt-3">
        <div className="flex-1">
          <div>
            <span>🌑 미완료</span>
            <AddTodo />
          </div>
        </div>
        <div className="flex-1">
          <span>🌕 완료</span>
          <MoreHorizIcon className="text-2xl ml-4 mb-1"></MoreHorizIcon>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
