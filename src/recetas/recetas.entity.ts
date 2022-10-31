/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CulturaGastronomica } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Recetas {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  descripcion: string;

  @Field()
  @Column()
  foto: string;

  @Field()
  @Column()
  preparacion: string;

  @Field()
  @Column()
  video: string;

  @Field(type => CulturaGastronomica)
  @ManyToOne(() => CulturaGastronomica, (cultura) => cultura.recetas, {
    onDelete: 'CASCADE',
  })
  cultura: CulturaGastronomica;
}
