import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, } from "@nestjs/websockets";
import { Websocket } from 'ws'
import { Server } from 'socket.io'
import { Body, OnModuleInit } from "@nestjs/common";
@WebSocketGateway()
export class WebsocketGatewayServer implements OnModuleInit {

    @WebSocketServer()
    server: Server;
    senderId: string;
    messages: string[] = []
    onModuleInit() {
        this.server.on('connection', (socket) => {
            this.senderId = socket.id
            console.log(`Connection id ${this.senderId}`)
        })
        console.log('Connection established...')
    }

    @SubscribeMessage('newMessage')
    handleEvent(@MessageBody() data: string) {
        this.messages.push(data)
        this.server.emit('New message', this.messages)
    }


}