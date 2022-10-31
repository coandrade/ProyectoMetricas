import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaGastronomicaModule } from './cultura-gastronomica/cultura-gastronomica.module';
import { CulturaGastronomica } from './cultura-gastronomica/cultura-gastronomica.entity';
import { RecetasModule } from './recetas/recetas.module';
import { Recetas } from './recetas/recetas.entity';
import { RestaurantesModule } from './restaurantes/restaurantes.module';
import { Restaurantes } from './restaurantes/restaurantes.entity';
import { ProductosModule } from './productos/productos.module';
import { Productos } from './productos/productos.entity';
import { CategoriaProductoModule } from './categoria-producto/categoria-producto.module';
import { CategoriaProducto } from './categoria-producto/categoria-producto.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    CulturaGastronomicaModule,
    RecetasModule,
    RestaurantesModule,
    ProductosModule,
    CategoriaProductoModule,
    UserModule,
    AuthModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:
        (process.env.DATABASE_URL &&
          process.env.DATABASE_URL.replace('postgres://', '')
            .split(':')[1]
            .split('@')[1]) ||
        process.env.DATABASE_URL ||
        process.env.DB_HOST ||
        'localhost',
      port: 5432,
      username:
        (process.env.DATABASE_URL &&
          process.env.DATABASE_URL.replace('postgres://', '').split(':')[0]) ||
        process.env.DB_USER ||
        'postgres',
      password:
        (process.env.DATABASE_URL &&
          process.env.DATABASE_URL.replace('postgres://', '')
            .split(':')[1]
            .split('@')[0]) ||
        process.env.DB_PASSWORD ||
        'postgres',
      database:
        (process.env.DATABASE_URL && process.env.DATABASE_URL.split('/')[3]) ||
        process.env.DB_NAME ||
        'cultura-gastronomica',
      entities: [
        CulturaGastronomica,
        Recetas,
        Restaurantes,
        Productos,
        CategoriaProducto,
      ],
      dropSchema: false,
      synchronize: true,
      keepConnectionAlive: true,
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsRun: true,

      cli: {
        migrationsDir: 'src/migrations',
      },
      extra: {
        ssl: false,
      },
    }),
    ProductosModule,
    CategoriaProductoModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
