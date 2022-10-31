import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RestaurantesService } from './restaurantes.service';

describe('RestaurantesService', () => {
  let service: RestaurantesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestaurantesService],
    }).compile();

    service = module.get<RestaurantesService>(RestaurantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
