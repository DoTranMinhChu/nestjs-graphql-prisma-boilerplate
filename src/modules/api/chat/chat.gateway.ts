
import {
    ConnectedSocket,
    MessageBody, OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer()
    server!: Server;

    constructor(

    ) {
    }

    async handleConnection(socket: Socket) {
        console.log("handleConnection ==> ", socket)
    }

    @SubscribeMessage('send_message')
    async listenForMessages(
        @MessageBody() content: string,
        @ConnectedSocket() socket: Socket,
    ) {
        console.log("listenForMessages ===> ", socket)
        this.server.sockets.emit('receive_message', {
            content
        });
    }
}