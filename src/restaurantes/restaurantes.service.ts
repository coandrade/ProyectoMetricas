import { Injectable } from '@nestjs/common';
import { Restaurantes } from './restaurantes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { RestauranteDTO } from './restaurante.dto';

@Injectable()
export class RestaurantesService {
  constructor(
    @InjectRepository(Restaurantes)
    private readonly restaurantesRepository: Repository<Restaurantes>,
  ) {}

  async findAll(): Promise<Restaurantes[]> {
    return await this.restaurantesRepository.find({ relations: [] });
  }

  async findOne(id: number): Promise<RestauranteDTO> {
    const restaurante = await this.restaurantesRepository.findOne(id);
    if (!restaurante)
      throw new BusinessLogicException(
        'El restaurante no existe',
        BusinessError.NOT_FOUND,
      );
    else return restaurante;
  }
  async create(restauranteDTO: RestauranteDTO): Promise<RestauranteDTO> {
    const restaurante = new Restaurantes();
    restaurante.nombre = restauranteDTO.nombre;
    restaurante.ciudad = restauranteDTO.ciudad;
    restaurante.estrellasMichelin = restauranteDTO.estrellasMichelin;
    restaurante.fechaEstrellasMichelin = restauranteDTO.fechaEstrellasMichelin;
    return await this.restaurantesRepository.save(restaurante);
  }

  async delete(id: number) {
    const restaurante = await this.restaurantesRepository.findOne(id);
    if (!restaurante)
      throw new BusinessLogicException(
        'El restaurante no existe',
        BusinessError.NOT_FOUND,
      );
    else {
      return await this.restaurantesRepository.remove(restaurante);
    }
  }

  async update(
    id: number,
    restauranteDTO: RestauranteDTO,
  ): Promise<RestauranteDTO> {
    const restaurante = await this.restaurantesRepository.findOne(id);
    if (!restaurante)
      throw new BusinessLogicException(
        'El restaurante no existe',
        BusinessError.NOT_FOUND,
      );
    restaurante.nombre = restauranteDTO.nombre;
    restaurante.ciudad = restauranteDTO.ciudad;
    restaurante.estrellasMichelin = restauranteDTO.estrellasMichelin;
    restaurante.fechaEstrellasMichelin = restauranteDTO.fechaEstrellasMichelin;
    await this.restaurantesRepository.save(restaurante);

    return restaurante;
  }
}
