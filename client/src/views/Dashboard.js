import React from 'react';
import { useSelector } from 'react-redux';

// Components //
import RoomTable from 'components/Room/RoomTable';
import TodoList from 'components/Todo/TodoList';
import FriendsList from 'components/Friends/FriendsList';

function Dashboard() {
  const { userName } = useSelector((state) => state.auth);

  return (
    <>
      <div
        className="pt-5 min-h-screen z-0"
        style={{ backgroundColor: '#404756' }}
      >
        {/* <RoomTable userName={userName} /> */}
        <TodoList />
        <FriendsList />
      </div>
    </>
  );
}

export default Dashboard;
