import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import {ApiModule} from '../api.module';

@Module({
    imports: [ApiModule],
    providers: [EventsGateway],
})
export class EventsModule {}