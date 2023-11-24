import { useContext } from 'react';
import { ConnectionManager } from './ConnectionManager';
import { MyForm } from './MyForm';
import { SocketContext } from '../context/socket';

export function Layout() {

  const { isConnected } = useContext(SocketContext);


  return (
    <div className="App">
      {isConnected ? (
        <MyForm/>
      ) : (
        <ConnectionManager isConnected={isConnected} />
      )}
    </div>
  );
}
