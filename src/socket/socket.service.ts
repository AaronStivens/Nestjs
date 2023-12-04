import { Injectable, Req } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
export class SocketService {
    private readonly connectedClients: Map<string, Socket> = new Map();

    handleconnection(socket:Socket):void{
        const clientId = socket.id;
        this.connectedClients.set(clientId, socket);
    }

}
