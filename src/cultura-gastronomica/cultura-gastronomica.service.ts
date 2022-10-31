import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CulturaGastronomica } from './cultura-gastronomica.entity';

@Injectable()
export class CulturaGastronomicaService {
  cacheKey = 'Cultura';

  constructor(
    @InjectRepository(CulturaGastronomica)
    private readonly culturaGastronomicaRepository: Repository<CulturaGastronomica>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findAll(): Promise<CulturaGastronomica[]> {
    const cached: CulturaGastronomica[] = await this.cacheManager.get<
      CulturaGastronomica[]
    >(this.cacheKey);
    if (!cached) {
      const culturas: CulturaGastronomica[] =
        await this.culturaGastronomicaRepository.find();
      await this.cacheManager.set(this.cacheKey, culturas);
      return culturas;
    }

    return cached;
  }

  async findOne(id: number): Promise<CulturaGastronomica> {
    const culturaGastronomica =
      await this.culturaGastronomicaRepository.findOne(id, {
        relations: ['recetas', 'restaurantes'],
      });
    if (!culturaGastronomica)
      throw new BusinessLogicException(
        'La cultura gastronómica no existe',
        BusinessError.NOT_FOUND,
      );
    else return culturaGastronomica;
  }

  async create(
    culturaGastronomica: CulturaGastronomica,
  ): Promise<CulturaGastronomica> {
    return await this.culturaGastronomicaRepository.save(culturaGastronomica);
  }

  async update(
    id: number,
    culturaGastronomica: CulturaGastronomica,
  ): Promise<CulturaGastronomica> {
    const pCulturaGastronomica =
      await this.culturaGastronomicaRepository.findOne(id);
    if (!pCulturaGastronomica)
      throw new BusinessLogicException(
        'La cultura gastronómica no existe',
        BusinessError.NOT_FOUND,
      );

    pCulturaGastronomica.nombre = culturaGastronomica.nombre;
    pCulturaGastronomica.descripcion = culturaGastronomica.descripcion;
    await this.culturaGastronomicaRepository.save(pCulturaGastronomica);

    return culturaGastronomica;
  }

  async delete(id: number) {
    const cultura = await this.culturaGastronomicaRepository.findOne(id);
    if (!cultura)
      throw new BusinessLogicException(
        'La cultura gastronómica no existe',
        BusinessError.NOT_FOUND,
      );
    else {
      return await this.culturaGastronomicaRepository.remove(cultura);
    }
  }
}
