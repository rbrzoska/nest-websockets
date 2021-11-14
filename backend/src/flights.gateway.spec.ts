import { Test, TestingModule } from '@nestjs/testing';
import { FlightsGateway } from './flights.gateway';

describe('FlightsGateway', () => {
  let gateway: FlightsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlightsGateway],
    }).compile();

    gateway = module.get<FlightsGateway>(FlightsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
