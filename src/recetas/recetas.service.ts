import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { Recetas } from './recetas.entity';
import { CulturaGastronomica } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class RecetasService {
  cacheKey = 'Receta';
    constructor(
        @InjectRepository(Recetas)
        private readonly recetasRepository: Repository<Recetas>,

       @InjectRepository(CulturaGastronomica)
       private readonly culturaRepository: Repository<CulturaGastronomica>,

       @Inject(CACHE_MANAGER)
       private readonly cacheManager: Cache

      ) {}

      async findAll(): Promise<Recetas[]> {
      
        const cached: Recetas[] = await this.cacheManager.get<Recetas[]>(this.cacheKey);           
        if (!cached) {
          const recetas: Recetas[] =  await this.recetasRepository.find();
          await this.cacheManager.set(this.cacheKey, recetas);
          return recetas;
        }
        return cached;    
      }

      async findOne(recetaId: number): Promise<Recetas> {    
        const recetas = await this.recetasRepository.findOne(recetaId);
        if (!recetas)
          throw new BusinessLogicException("La receta no existe", BusinessError.NOT_FOUND)
        else
          return recetas;
      }

      async create(receta: Recetas): Promise<Recetas> {
        return await this.recetasRepository.save(receta);
      }

      async update(recetaId: number, recetas: Recetas): Promise<Recetas> {
        const receta = await this.recetasRepository.findOne(recetaId);
        if (!receta)
          throw new BusinessLogicException("La receta no existe", BusinessError.NOT_FOUND)
      

        await this.recetasRepository.save(recetas);
    
        return recetas;
      }
    
      async delete(recetaId: number) {
        const recetas = await this.recetasRepository.findOne(recetaId);
        if (!recetas)
          throw new BusinessLogicException("La receta no existe", BusinessError.NOT_FOUND);
      
                  
        return await this.recetasRepository.remove(recetas);
      
            
      }


      // async findAll(culturaId: number): Promise<RecetasDTO[]> {
      //   const cultura = await this.culturaRepository.findOne(culturaId);
      //   if (!cultura)
      //      throw new BusinessLogicException("La cultura gastronomica no existe", BusinessError.NOT_FOUND)  
        
      //   const cached: RecetasDTO[] = await this.cacheManager.get<RecetasDTO[]>(this.cacheKey);           
      //   if (!cached) {
      //     const recetas: RecetasDTO[] =  await this.recetasRepository.find();
      //     await this.cacheManager.set(this.cacheKey, recetas);
      //     return recetas;
      //   }
      //   return cached;        
      // }

    
      // async findOne(culturaId: number,id: string): Promise<RecetasDTO> {
      //   const cultura = await this.culturaRepository.findOne(culturaId, { relations: ["recetas"]});
      //   if (!cultura)
      //     throw new BusinessLogicException("La cultura gastronomica no existe", BusinessError.NOT_FOUND);       
        
      //   const recetas = await this.recetasRepository.findOne(id);
      //   if (!recetas)
      //     throw new BusinessLogicException("La receta no existe", BusinessError.NOT_FOUND)
      //   else
      //     return recetas;
      // }

}
