import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsEmpty, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';


export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsEmpty()
    @Type(()=>Number)
    @IsPositive()
    id:number


}

/*Nos permite extender un DTO de otro DTO

Extensión Parciales: Hace todas las propiedades que tenga la clase padre opcionales.  

*/