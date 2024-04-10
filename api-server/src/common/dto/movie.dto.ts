// create-movie.dto.ts
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator'
import { Director } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'
import { DirectorDto } from './director.dto'

export class MovieDto {

    @ApiProperty({ description: 'Movie ID', example: 1 })
    @IsInt()
    readonly movie_id: number

    @IsString()
    movie_name: string

    @IsOptional()
    @IsInt()
    movie_length?: number

    @IsOptional()
    @IsString()
    movie_lang?: string

    @IsOptional()
    @IsString()
    age_certificate?: string

    @IsOptional()
    @IsDate()
    release_date?: Date

    director_id: Director
}
