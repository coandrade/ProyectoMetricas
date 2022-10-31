/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { CulturaGastronomica } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Restaurantes {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  ciudad: string;

  @Field()
  @Column()
  estrellasMichelin: string;

  @Field()
  @Column()
  fechaEstrellasMichelin: string;

  @Field(type => CulturaGastronomica)
  @ManyToOne(() => CulturaGastronomica, (cultura) => cultura.restaurantes, {
    onDelete: 'CASCADE',
  })
  cultura: CulturaGastronomica;
}
