import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsGateway } from './flights.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FlightsGateway],
})
export class AppModule {}
