import ListCaller from '@/app/components/room/ListCaller';
import React from 'react';
import RoomController from '../../components/room/RoomController';
import { SocketContext, socket } from '../../apis/utils/socket.context';

const page = () => {
  return (
    <SocketContext.Provider value = {socket}>
      <RoomController></RoomController>
      <ListCaller></ListCaller>
    </SocketContext.Provider>
  )
}

export default page