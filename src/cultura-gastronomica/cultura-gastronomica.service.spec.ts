import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { CulturaGastronomicaService } from './cultura-gastronomica.service';
import { CulturaGastronomica } from './cultura-gastronomica.entity';

import { faker } from '@faker-js/faker';
import { CacheModule } from '@nestjs/common';

describe('CulturaGastronomicaService', () => {
  let service: CulturaGastronomicaService;
  let repository: Repository<CulturaGastronomica>;
  let culturaList: CulturaGastronomica[];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig(), CacheModule.register()],
      providers: [CulturaGastronomicaService],
    }).compile();

    service = module.get<CulturaGastronomicaService>(
      CulturaGastronomicaService,
    );
    repository = module.get<Repository<CulturaGastronomica>>(
      getRepositoryToken(CulturaGastronomica),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    culturaList = [];
    for (let i = 0; i < 5; i++) {
      const cultura: CulturaGastronomica = await repository.save({
        id: faker.datatype.number({ min: 1, max: 999999 }),
        nombre: faker.lorem.sentence(10),
        descripcion: faker.lorem.sentence(),
      });
      culturaList.push(cultura);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all CulturasGastronomicas', async () => {
    const cultura: CulturaGastronomica[] = await service.findAll();
    expect(cultura).not.toBeNull();
    expect(cultura).toHaveLength(culturaList.length);
  });

  it('findOne should return a CulturaGastronomica by id', async () => {
    const storedCultura: CulturaGastronomica = culturaList[0];
    const cultura: CulturaGastronomica = await service.findOne(
      storedCultura.id,
    );
    expect(cultura).not.toBeNull();
    expect(cultura.nombre).toEqual(storedCultura.nombre);
    expect(cultura.descripcion).toEqual(storedCultura.descripcion);
  });

  it('findOne should throw an exception for an invalid CulturaGastronomica', async () => {
    await expect(() => service.findOne(0)).rejects.toHaveProperty(
      'message',
      'La cultura gastronómica no existe',
    );
  });

  it('create should return a new cultura gastronomica', async () => {
    const cultura: CulturaGastronomica = {
      id: faker.datatype.number({ min: 1, max: 999999 }),
      nombre: `Cultura  ${faker.datatype.number()}`,
      descripcion: faker.company.name(),
      recetas: [],
      restaurantes: [],
      productos: [],
    };
    const newCultura: CulturaGastronomica = await service.create(cultura);
    expect(newCultura).not.toBeNull();

    const storedCultura: CulturaGastronomica = await repository.findOne({
      where: { id: newCultura.id },
    });
    expect(storedCultura).not.toBeNull();
    expect(storedCultura.nombre).toEqual(newCultura.nombre);
  });

  it('update should modify a cultura gastronomica', async () => {
    const cultura: CulturaGastronomica = culturaList[0];
    cultura.nombre = 'New name';
    cultura.descripcion =
      'Son tradicionales platillos el pastel de garbanzo, el arroz con pollo, el arroz con carne, el arroz de arveja y el arroz de yuca. También lo es el mute, sopa preparada con carne de cerdo, maíz, papa y garbanzos, servida con arroz y pasteles de garbanzo';

    const updatedCultura: CulturaGastronomica = await service.update(
      cultura.id,
      cultura,
    );
    expect(updatedCultura).not.toBeNull();

    const storedCultura: CulturaGastronomica = await repository.findOne({
      where: { id: cultura.id },
    });
    expect(storedCultura).not.toBeNull();
    expect(storedCultura.nombre).toEqual(cultura.nombre);
    expect(storedCultura.descripcion).toEqual(cultura.descripcion);
  });

  it('update should throw an exception for an invalid cultura gastronomica', async () => {
    let cultura: CulturaGastronomica = culturaList[0];
    cultura = {
      ...cultura,
      nombre: 'New name',
      descripcion: '',
    };
    await expect(() => service.update(0, cultura)).rejects.toHaveProperty(
      'message',
      'La cultura gastronómica no existe',
    );
  });

  it('delete should remove a cultura gastronomica', async () => {
    const cultura: CulturaGastronomica = culturaList[0];
    await service.delete(cultura.id);

    const deletedProduct: CulturaGastronomica = await repository.findOne({
      where: { id: cultura.id },
    });
    expect(deletedProduct).toBeUndefined();
  });

  it('delete should throw an exception for an invalid cultura gastronomica', async () => {
    await expect(() => service.delete(0)).rejects.toHaveProperty(
      'message',
      'La cultura gastronómica no existe',
    );
  });
});
