import { useEffect, useRef } from 'react';
import io, { Socket, ManagerOptions, SocketOptions } from 'socket.io-client';

type TProps = {
  uri: string;
  opts?: Partial<ManagerOptions & SocketOptions> | undefined;
};

export const useSocket = ({ uri, opts }: TProps): Socket => {
  const { current: socket } = useRef(io(uri, opts));
  useEffect((): (() => void) => {
    return (): void => {
      if (socket) {
        socket.close();
      }
    };
  }, []);
  return socket;
};
