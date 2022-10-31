import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { Productos } from './productos.entity';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Productos)
        private readonly productosRepository: Repository<Productos>
    ){}

    async findAll(): Promise<Productos[]> {
        return await this.productosRepository.find({ relations: [] });
    }

    async findOne(id: number): Promise<Productos> {
        const producto: Productos = await this.productosRepository.findOne({where: {id}, relations: [] } );
        if (!producto)
          throw new BusinessLogicException("El producto con el id dado no fue encontrado", BusinessError.NOT_FOUND);
   
        return producto;
    }

    async create(producto: Productos): Promise<Productos> {
        return await this.productosRepository.save(producto);
    }

    async update(id: string, producto: Productos): Promise<Productos> {
        const persistedProducto: Productos = await this.productosRepository.findOne({where:{id}});
        if (!persistedProducto)
          throw new BusinessLogicException("El producto con el id dado no fue encontrado", BusinessError.NOT_FOUND);
        
        return await this.productosRepository.save(persistedProducto);
    }

    async delete(id: string) {
        const producto: Productos = await this.productosRepository.findOne({where:{id}});
        if (!producto)
          throw new BusinessLogicException("El producto con el id dado no fue encontrado", BusinessError.NOT_FOUND);
     
        await this.productosRepository.remove(producto);
    }

}
