import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from './productos.entity';
import { ProductosService } from './productos.service';

@Module({
  providers: [ProductosService],
  imports: [TypeOrmModule.forFeature([Productos])],
})
export class ProductosModule {}
