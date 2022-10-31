import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { RecetasService } from './recetas.service';
import { Recetas } from './recetas.entity';

import { faker } from '@faker-js/faker';
import { CacheModule } from '@nestjs/common';

describe('RecetasService', () => {
    let service: RecetasService;
    let repository: Repository<Recetas>;
    let recetaList: Recetas[];
  
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [...TypeOrmTestingConfig(), CacheModule.register()],
        providers: [RecetasService],
      }).compile();
  
      service = module.get<RecetasService>(
        RecetasService,
      );
      repository = module.get<Repository<Recetas>>(
        getRepositoryToken(Recetas),
      );
      await seedDatabase();
    });
  
    const seedDatabase = async () => {
      repository.clear();
      recetaList = [];
      for (let i = 0; i < 5; i++) {
        const receta: Recetas = await repository.save({
          id: faker.datatype.number({ min: 1, max: 999999 }),
          nombre: faker.lorem.sentence(10),
          descripcion: faker.lorem.sentence(),
          foto: faker.lorem.sentence(),
          preparacion: faker.lorem.sentence(),
          video: faker.lorem.sentence()
        });
        recetaList.push(receta);
      }
    };
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    it('findAll should return all Recetas', async () => {
      const cultura: Recetas[] = await service.findAll();
      expect(cultura).not.toBeNull();
      expect(cultura).toHaveLength(recetaList.length);
    });

  
    it('findOne should return a Receta by id', async () => {
      const storedCultura: Recetas = recetaList[0];
      const cultura: Recetas = await service.findOne(
        storedCultura.id,
      );
      expect(cultura).not.toBeNull();
      expect(cultura.nombre).toEqual(storedCultura.nombre);
      expect(cultura.descripcion).toEqual(storedCultura.descripcion);
    });
  
    it('findOne should throw an exception for an invalid receta', async () => {
      await expect(() => service.findOne(0)).rejects.toHaveProperty(
        'message',
        'La receta no existe',
      );
    });
  
 
    it('update should modify a receta', async () => {
      const cultura: Recetas = recetaList[0];
      cultura.nombre = 'New name';
      cultura.descripcion =
        'Son tradicionales platillos el pastel de garbanzo, el arroz con pollo, el arroz con carne, el arroz de arveja y el arroz de yuca. También lo es el mute, sopa preparada con carne de cerdo, maíz, papa y garbanzos, servida con arroz y pasteles de garbanzo';
  
      const updatedCultura: Recetas = await service.update(
        cultura.id,
        cultura,
      );
      expect(updatedCultura).not.toBeNull();
  
      const storedCultura: Recetas = await repository.findOne({
        where: { id: cultura.id },
      });
      expect(storedCultura).not.toBeNull();
      expect(storedCultura.nombre).toEqual(cultura.nombre);
      expect(storedCultura.descripcion).toEqual(cultura.descripcion);
    });
  
    it('update should throw an exception for an invalid receta', async () => {
      let cultura: Recetas = recetaList[0];
      cultura = {
        ...cultura,
        nombre: 'New name',
        descripcion: '',
      };
      await expect(() => service.update(0, cultura)).rejects.toHaveProperty(
        'message',
        'La receta no existe',
      );
    });
  
    it('delete should remove a receta', async () => {
      const cultura: Recetas = recetaList[0];
      await service.delete(cultura.id);
  
      const deletedProduct: Recetas = await repository.findOne({
        where: { id: cultura.id },
      });
      expect(deletedProduct).toBeUndefined();
    });
  
    it('delete should throw an exception for an invalid receta', async () => {
      await expect(() => service.delete(0)).rejects.toHaveProperty(
        'message',
        'La receta no existe',
      );
    });
  });