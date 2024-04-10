// create-movies-revenues.dto.ts
import { IsInt, IsNumber, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateMoviesRevenuesDto {

    @ApiProperty({ description: 'Movie ID', example: 1 })
    @IsInt()
    readonly movie_id: number

    @ApiProperty({ description: 'Domestic revenues of the movie', example: 1000000, required: false })
    @IsNumber()
    @IsOptional()
    readonly revenues_domestic?: number

    @ApiProperty({ description: 'International revenues of the movie', example: 2000000, required: false })
    @IsNumber()
    @IsOptional()
    readonly revenues_international?: number
}
