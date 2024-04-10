import { IsOptional, IsNumber, IsPositive } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMoviesRevenuesDto {

    @ApiPropertyOptional({ description: 'Domestic revenues for the movie' })
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    revenues_domestic?: number;

    @ApiPropertyOptional({ description: 'International revenues for the movie' })
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    revenues_international?: number;
}
