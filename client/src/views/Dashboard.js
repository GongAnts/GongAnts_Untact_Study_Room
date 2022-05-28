import React from 'react';
import { useSelector } from 'react-redux';
import RoomTable from 'components/Room/RoomTable';
import TodoList from 'components/Todo/TodoList';

function Dashboard() {
  const { userName } = useSelector((state) => state.auth);

  return (
    <>
      <div className="mt-5">
        <RoomTable userName={userName} />
        <TodoList />
      </div>
    </>
  );
}

export default Dashboard;
