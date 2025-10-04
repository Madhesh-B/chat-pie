import { io } from "socket.io-client";

const Socket = io("http://localhost:3000/chat");
export default Socket;