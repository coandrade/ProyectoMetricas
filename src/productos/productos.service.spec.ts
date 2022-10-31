import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Productos } from './productos.entity';
import { ProductosService } from './productos.service';

describe('ProductosService', () => {
  let service: ProductosService;
  let repository: Repository<Productos>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProductosService],
    }).compile();
 
    service = module.get<ProductosService>(ProductosService);
    repository = module.get<Repository<Productos>>(getRepositoryToken(Productos));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
