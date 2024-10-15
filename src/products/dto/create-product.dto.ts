import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsString()
    @IsOptional()
    description?: string;
    
    @IsNumber()
    @Type(() => Number)// Intenta transformarlo en un número
    price: number;


}

export function asignar(c1:CreateProductDto,c2:any){
    c1.name = c2.name as string;
    c1.description = c2.description as string;
    c1.price = c2.price as number;
}
