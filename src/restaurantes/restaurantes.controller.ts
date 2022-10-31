import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { BusinessErrorsInterceptor } from '../interceptors/interceptor';
import { RestauranteDTO } from './restaurante.dto';
import { RestaurantesService } from './restaurantes.service';

import { Permissions } from '../auth/guards/permissions.decorator';
import { PermissionsGC } from 'src/user/permissions.enum';

@Controller('Restaurantes')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RestaurantesController {
  constructor(private readonly restaurantesService: RestaurantesService) {}

  @Permissions(PermissionsGC.GetGC)
  @Get()
  async findAll() {
    return await this.restaurantesService.findAll();
  }

  @Get(':restauranteId')
  @Permissions(PermissionsGC.GetGC)
  async findOne(@Param('restauranteId') restauranteId: number) {
    return await this.restaurantesService.findOne(restauranteId);
  }

  @Post()
  @Permissions(PermissionsGC.Create)
  @HttpCode(200)
  async create(@Body() restauranteDTO: RestauranteDTO) {
    return await this.restaurantesService.create(restauranteDTO);
  }

  @Put(':restauranteId')
  @Permissions(PermissionsGC.Update)
  async update(
    @Param('restauranteId') restauranteId: number,
    @Body() restauranteDTO: RestauranteDTO,
  ) {
    return await this.restaurantesService.update(restauranteId, restauranteDTO);
  }

  @Delete(':restauranteId')
  @Permissions(PermissionsGC.Delete)
  @HttpCode(204)
  async delete(@Param('restauranteId') restauranteId: number) {
    return await this.restaurantesService.delete(restauranteId);
  }
}
