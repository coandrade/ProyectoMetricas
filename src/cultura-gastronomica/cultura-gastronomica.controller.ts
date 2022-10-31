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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from '../interceptors/interceptor';
import { CulturaGastronomicaDTO } from './cultura-gastronomica.dto';
import { CulturaGastronomica } from './cultura-gastronomica.entity';
import { CulturaGastronomicaService } from './cultura-gastronomica.service';
import { plainToInstance } from 'class-transformer';

import { Permissions } from '../auth/guards/permissions.decorator';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { PermissionsGC } from '../user/permissions.enum';

@Controller('CulturasGastronomicas')
@UseInterceptors(BusinessErrorsInterceptor)
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CulturaGastronomicaController {
  constructor(
    private readonly culturaGastronomicaService: CulturaGastronomicaService,
  ) {}

  @Permissions(PermissionsGC.GetGC)
  @Get()
  async findAll() {
    return await this.culturaGastronomicaService.findAll();
  }

  @Get(':culturaGastronomicaId')
  @Permissions(PermissionsGC.GetGC)
  async findOne(@Param('culturaGastronomicaId') culturaGastronomicaId: number) {
    return await this.culturaGastronomicaService.findOne(culturaGastronomicaId);
  }

  @Post()
  @Permissions(PermissionsGC.Create)
  @HttpCode(200)
  async create(@Body() culturaGastronomicaDTO: CulturaGastronomicaDTO) {
    const culturaGastronomica = plainToInstance(
      CulturaGastronomica,
      culturaGastronomicaDTO,
    );
    return await this.culturaGastronomicaService.create(culturaGastronomica);
  }

  @Put(':culturaGastronomicaId')
  @Permissions(PermissionsGC.Update)
  async update(
    @Param('culturaGastronomicaId') culturaGastronomicaId: number,
    @Body() culturaGastronomicaDTO: CulturaGastronomicaDTO,
  ) {
    const pCulturaGastronomica = plainToInstance(
      CulturaGastronomica,
      culturaGastronomicaDTO,
    );
    return await this.culturaGastronomicaService.update(
      culturaGastronomicaId,
      pCulturaGastronomica,
    );
  }

  @Delete(':culturaGastronomicaId')
  @HttpCode(204)
  @Permissions(PermissionsGC.Delete)
  async delete(@Param('culturaGastronomicaId') culturaGastronomicaId: number) {
    return await this.culturaGastronomicaService.delete(culturaGastronomicaId);
  }
}
