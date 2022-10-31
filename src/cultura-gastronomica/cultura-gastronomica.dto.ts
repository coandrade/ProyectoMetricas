/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
@InputType()
export class CulturaGastronomicaDTO {

  @Field()
  @IsNumber()
  readonly id: number;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;
}
