import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurantes } from '../../restaurantes/restaurantes.entity';
import { CulturaGastronomica } from '../../cultura-gastronomica/cultura-gastronomica.entity';
import { Recetas } from '../../recetas/recetas.entity';
import { Productos } from '../../productos/productos.entity';
import { CategoriaProducto } from '../../categoria-producto/categoria-producto.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      CulturaGastronomica,
      Restaurantes,
      Recetas,
      Productos,
      CategoriaProducto,
    ],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([
    CulturaGastronomica,
    Restaurantes,
    Recetas,
    Productos,
    CategoriaProducto,
  ]),
];
