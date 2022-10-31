import { Module } from '@nestjs/common';
import { Restaurantes } from './restaurantes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantesService } from './restaurantes.service';
import { RestaurantesController } from './restaurantes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurantes])],
  controllers: [RestaurantesController],
  providers: [RestaurantesService],
})
export class RestaurantesModule {}
