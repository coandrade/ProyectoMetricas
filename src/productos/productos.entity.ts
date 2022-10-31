/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { CategoriaProducto } from '../categoria-producto/categoria-producto.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CulturaGastronomica } from '../cultura-gastronomica/cultura-gastronomica.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Productos {
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
    historia: string;

    @Field()
    @Column()
    categoria: string;

    @OneToOne(() => CategoriaProducto, categoriaProducto => categoriaProducto.producto)
    @JoinColumn()
    categoriaProducto: CategoriaProducto;

    @Field(type => CulturaGastronomica)
    @ManyToOne(() => CulturaGastronomica, cultura => cultura.productos, {
        onDelete: 'CASCADE'
      })
      cultura: CulturaGastronomica;
}
