import { Module } from "@nestjs/common/decorators";
import { WebsocketGatewayServer } from "./websocketgatewayserver";



@Module({
  imports: [
    WebsocketGatewayServer
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class WebsocketGatewayServerModule {

}