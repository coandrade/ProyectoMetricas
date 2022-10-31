/* eslint-disable prettier/prettier */
import { Productos } from '../productos/productos.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoriaProducto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
    @Column()
    descripcion: string;
    
    @OneToOne(() => Productos, producto => producto.categoriaProducto)
        producto: Productos;
 }