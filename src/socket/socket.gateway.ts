import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()private server: Socket;

  constructor(private readonly socketService: SocketService) {}
  
  private usuario : string; //Declarando la variabla para uso en diferentes funciones

  handleConnection(socket: Socket): void {
    this.socketService.handleconnection(socket);
  }

  setUsuario(usuario: any): void {
    this.usuario = usuario;
    this.handleMessage();
  }

  private handleMessage(): void {
    console.log(`El usuario ${this.usuario} se ha conectado`);
  }
  
  //Socket escuchando 
  @SubscribeMessage('messageFromClient')
  handleMessageFromClient(@ConnectedSocket() client: Socket, @MessageBody() payload: any): void {
    console.log(this.usuario + payload.message);
  }


}