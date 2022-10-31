import { CacheModule, Module } from '@nestjs/common';
import { RecetasController } from './recetas.controller';
import { RecetasService } from './recetas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recetas } from './recetas.entity';
import { CulturaGastronomica } from '../cultura-gastronomica/cultura-gastronomica.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Recetas,CulturaGastronomica]),CacheModule.register()],
    controllers: [RecetasController],
    providers: [RecetasService],
})
export class RecetasModule {}
