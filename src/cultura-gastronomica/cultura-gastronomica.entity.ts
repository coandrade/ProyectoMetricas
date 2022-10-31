/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Productos } from '../productos/productos.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recetas } from '../recetas/recetas.entity';
import { Restaurantes } from '../restaurantes/restaurantes.entity';
import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class CulturaGastronomica {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  descripcion: string;

  @Field((type) => [Recetas])
  @OneToMany(() => Recetas, (recetas) => recetas.cultura)
  recetas: Recetas[];

  @Field((type) => [Productos])
  @OneToMany(() => Productos, (productos) => productos.cultura)
  productos: Recetas[];

  @Field((type) => [Restaurantes])
  @OneToMany(() => Restaurantes, (restaurantes) => restaurantes.cultura)
  restaurantes: Restaurantes[];
}
