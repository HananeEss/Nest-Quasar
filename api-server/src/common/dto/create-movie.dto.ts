// create-movie.dto.ts
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator'

export class CreateMovieDto {
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

    @IsInt()
    director_id: number
}
