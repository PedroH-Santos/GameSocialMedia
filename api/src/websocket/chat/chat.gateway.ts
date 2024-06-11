import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server,Socket } from 'socket.io'
import { PayLoadJoinRoom } from '../dto/payload-join-room';

@WebSocketGateway(8001, { cors: ":*" })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinInRoom')
  joinInRoom(@MessageBody() roomName: string, @ConnectedSocket() client: Socket): void {
    console.log(client.id); 

    client.join(roomName);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(@MessageBody() payload: PayLoadJoinRoom, @ConnectedSocket() client: Socket): void {
    console.log(payload); 
    console.log(client.id); 
    this.server.to(payload.roomName).emit('msgToClient', {
      socketId: payload.socketId,
      message: payload.message});
  }



}
