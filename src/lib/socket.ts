import { useEffect, useRef } from 'react';
import io, { Socket, ManagerOptions, SocketOptions } from 'socket.io-client';

export type Props = {
  uri: string;
  opts?: Partial<ManagerOptions & SocketOptions> | undefined;
};

export function useSocket({ uri, opts }: Props): Socket {
  const { current: socket } = useRef(io(uri, opts));
  useEffect((): (() => void) => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);
  return socket;
}
