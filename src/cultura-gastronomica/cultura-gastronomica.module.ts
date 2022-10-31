import { Module, CacheModule } from '@nestjs/common';
import { CulturaGastronomicaController } from './cultura-gastronomica.controller';
import { CulturaGastronomicaService } from './cultura-gastronomica.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaGastronomica } from './cultura-gastronomica.entity';
import { CulturaGastronomicaResolver } from './cultura-gastronomica.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([CulturaGastronomica]),
    CacheModule.register(),
  ],
  controllers: [CulturaGastronomicaController],
  providers: [CulturaGastronomicaService, CulturaGastronomicaResolver],
})
export class CulturaGastronomicaModule {}
