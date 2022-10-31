/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { CulturaGastronomicaService } from './cultura-gastronomica.service';
import { CulturaGastronomica } from './cultura-gastronomica.entity';
import { CulturaGastronomicaDTO } from './cultura-gastronomica.dto';

@Resolver()
export class CulturaGastronomicaResolver {
  constructor(private service: CulturaGastronomicaService) {}

  @Query(() => [CulturaGastronomica])
  culturas(): Promise<CulturaGastronomica[]> {
    return this.service.findAll();
  }

  @Query(() => CulturaGastronomica)
  cultura(@Args('id') id: number): Promise<CulturaGastronomica> {
    return this.service.findOne(id);
  }

  @Mutation(() => CulturaGastronomica)
  createCultura(
    @Args('culturagastronomica') culturaDto: CulturaGastronomicaDTO,
  ): Promise<CulturaGastronomica> {
    const cultura = plainToInstance(CulturaGastronomica, culturaDto);
    return this.service.create(cultura);
  }

  @Mutation(() => CulturaGastronomica)
  updateCultura(
    @Args('id') id: number,
    @Args('culturagastronomica') culturaDto: CulturaGastronomicaDTO,
  ): Promise<CulturaGastronomica> {
    const cultura = plainToInstance(CulturaGastronomica, culturaDto);
    return this.service.update(id, cultura);
  }

  @Mutation(() => String)
  deleteCultura(@Args('id') id: number) {
    this.service.delete(id);
    return id;
  }
}
