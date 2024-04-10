import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from '../common/dto/create-movie.dto'
import { Actor } from '@prisma/client'

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {

    constructor(private moviesService: MoviesService) {
    }

    @Get('')
    @ApiResponse({ status: 200, description: 'List of all movies.' })
    fetchAll() {
        return this.moviesService.fetchAll();
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'Movie ID' })
    @ApiResponse({ status: 200, description: 'Movie details.' })
    fetchById(@Param('id') id: string) {
        return this.moviesService.fetchById(id);
    }

    @Post('')
    @ApiOperation({ summary: 'Create a new movie' })
    @ApiBody({ type: CreateMovieDto })
    @ApiResponse({ status: 201, description: 'Movie created successfully.' })
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.create(createMovieDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a movie by ID' })
    @ApiParam({ name: 'id', description: 'Movie ID' })
    @ApiBody({ type: CreateMovieDto })
    @ApiResponse({ status: 200, description: 'Movie updated successfully.' })
    update(@Param('id') id: string, @Body() updateMovieDto: CreateMovieDto) {
        return this.moviesService.update(id, updateMovieDto);
    }

    @Get(':id/actors')
    @ApiParam({ name: 'id', description: 'Movie ID' })
    @ApiOperation({ summary: 'Get actors by movie ID' })
    @ApiResponse({ status: 200, description: 'List of actors for the movie.' })
    async getActorsByMovieId(@Param('id') id: string): Promise<Actor[]> {
        return this.moviesService.getActorsByMovieId(parseInt(id));
    }
}
