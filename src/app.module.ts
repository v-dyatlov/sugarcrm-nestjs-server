import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EventsModule} from './api/events/events.module';

@Module({
  imports: [EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
