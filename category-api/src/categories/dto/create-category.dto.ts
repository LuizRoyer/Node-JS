import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateCategoryDto {

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()  
    @ApiProperty({ description: 'nome da categoria' })    
    name: string
}
