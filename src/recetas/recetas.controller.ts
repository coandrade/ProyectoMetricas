import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Permissions } from '../auth/guards/permissions.decorator';
import { PermissionsGC } from 'src/user/permissions.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { BusinessErrorsInterceptor } from '../interceptors/interceptor';
import { RecetasDTO } from './recetas.dto';
import { RecetasService } from './recetas.service';
import { Recetas } from './recetas.entity';
import { plainToInstance } from 'class-transformer';



@Controller('recetas')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {}

  @Post()
  @Permissions(PermissionsGC.Create)
  @HttpCode(200)
  async create(
    @Body() recetasDTO: RecetasDTO,
  ) {
    const receta: Recetas = plainToInstance(Recetas, recetasDTO);
    return await this.recetasService.create(receta);
  }

  @Put('/:recetaId')
  @Permissions(PermissionsGC.Update)
  async update(
    @Param('recetaId') recetaId: number,
    @Body() recetasDTO: RecetasDTO,
  ) {
    const receta: Recetas = plainToInstance(Recetas, recetasDTO);
    return await this.recetasService.update(recetaId, receta);
  }

  @Delete('/:recetaId')
  @Permissions(PermissionsGC.Delete)
  @HttpCode(204)
  async delete(
    @Param('recetaId') recetaId: number,
  ) {
    return await this.recetasService.delete(recetaId);
  }

  @Permissions(PermissionsGC.GetGC)
  @Get()
  async findAll() {
    return await this.recetasService.findAll();
  }

  @Permissions(PermissionsGC.GetGC)
  @Get('/:recetaId')
  async findOne(
    @Param('recetaId') recetaId: number,
  ) {
    return await this.recetasService.findOne(recetaId);
  }
}
