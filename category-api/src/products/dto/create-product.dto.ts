import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator"

export class CreateProductDto {

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()  
    @ApiProperty({ description: 'nome do produto' })    
    name: string

    @Min(0)
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'preço do produto' })    
    price: number

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()  
    @ApiProperty({ description: 'descrição do produto' })    
    description: string

    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'categoria do produto' })    
    categoryId: number
}
