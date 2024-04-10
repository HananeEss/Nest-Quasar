import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { ActorsService } from './actors.service';
import { CreateActorDto } from '../common/dto/create-actor.dto';

@Controller('actors')
@ApiTags('Actors')
export class ActorsController {

    constructor(private actorsService: ActorsService) {
    }

    @Get('')
    @ApiResponse({ status: 200, description: 'List of all actors.' })
    fetchAll() {
        return this.actorsService.fetchAll();
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'Actor ID' })
    @ApiResponse({ status: 200, description: 'Actor details.' })
    fetchById(@Param('id') id: string) {
        return this.actorsService.fetchById(id);
    }

    @Post('')
    @ApiOperation({ summary: 'Create a new actor' })
    @ApiBody({ type: CreateActorDto })
    @ApiResponse({ status: 201, description: 'Actor created successfully.' })
    create(@Body() createActorDto: CreateActorDto) {
        return this.actorsService.create(createActorDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an actor by ID' })
    @ApiParam({ name: 'id', description: 'Actor ID' })
    @ApiBody({ type: CreateActorDto })
    @ApiResponse({ status: 200, description: 'Actor updated successfully.' })
    update(@Param('id') id: string, @Body() updateActorDto: CreateActorDto) {
        return this.actorsService.update(id, updateActorDto);
    }
}
