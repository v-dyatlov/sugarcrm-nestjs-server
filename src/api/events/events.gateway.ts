import {
    WebSocketGateway,
    SubscribeMessage,
    WsResponse,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets';

import {Observable, from} from 'rxjs';
import {map} from 'rxjs/operators';

import {ApiService} from '../api.service';

@WebSocketGateway()
export class EventsGateway {
    constructor(private readonly apiService: ApiService) {}
    @WebSocketServer() server;

    @SubscribeMessage('get_markers')
    onEvent(client, data) {
        this.apiService.getAccounts(client);
    }
}