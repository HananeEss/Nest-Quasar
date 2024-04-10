// movies-revenues.controller.ts
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateMoviesRevenuesDto } from '../common/dto/create-movies-revenues.dto'
import { MoviesRevenuesService } from './movies_revenues.service'
import { UpdateMoviesRevenuesDto } from '../common/dto/update-movies-revenues.dto'

@Controller('movies-revenues')
@ApiTags('MoviesRevenues')
export class MoviesRevenuesController {

    constructor (private moviesRevenuesService: MoviesRevenuesService) {
    }

    @Get('')
    @ApiResponse({ status: 200, description: 'List of all movies revenues.' })
    fetchAll () {
        return this.moviesRevenuesService.fetchAll()
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'MoviesRevenues ID' })
    @ApiResponse({ status: 200, description: 'MoviesRevenues details.' })
    fetchById (@Param('id') id: string) {
        return this.moviesRevenuesService.fetchById(id)
    }

    @Get('by-movie/:movieId')
    @ApiParam({ name: 'movieId', description: 'Movie ID' })
    @ApiResponse({ status: 200, description: 'MoviesRevenues details by Movie ID.' })
    fetchByMovieId (@Param('movieId') movieId: string) {
        return this.moviesRevenuesService.fetchByMovieId(movieId)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update movies revenues by ID' })
    @ApiParam({ name: 'id', description: 'MoviesRevenues ID' })
    @ApiBody({ type: CreateMoviesRevenuesDto })
    @ApiResponse({ status: 200, description: 'MoviesRevenues updated successfully.' })
    update (@Param('id') id: string, @Body() updateMoviesRevenuesDto: CreateMoviesRevenuesDto) {
        return this.moviesRevenuesService.update(id, updateMoviesRevenuesDto)
    }
}

