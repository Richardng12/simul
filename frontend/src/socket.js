import io from 'socket.io-client';
import HOST from './config/config';

// eslint-disable-next-line import/prefer-default-export
const socket = io(HOST);
export default socket;
