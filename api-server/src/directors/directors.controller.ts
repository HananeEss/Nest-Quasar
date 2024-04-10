// directors.controller.ts
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { DirectorsService } from './directors.service'
import { CreateDirectorDto } from '../common/dto/create-director.dto'

@Controller('directors')
@ApiTags('Directors')
export class DirectorsController {

    constructor (private directorsService: DirectorsService) {
    }

    @Get('')
    @ApiResponse({ status: 200, description: 'List of all directors.' })
    fetchAll () {
        return this.directorsService.fetchAll()
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'Director ID' })
    @ApiResponse({ status: 200, description: 'Director details.' })
    fetchById (@Param('id') id: string) {
        return this.directorsService.fetchById(id)
    }

    @Post('')
    @ApiOperation({ summary: 'Create a new director' })
    @ApiBody({ type: CreateDirectorDto })
    @ApiResponse({ status: 201, description: 'Director created successfully.' })
    create (@Body() createDirectorDto: CreateDirectorDto) {
        return this.directorsService.create(createDirectorDto)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a director by ID' })
    @ApiParam({ name: 'id', description: 'Director ID' })
    @ApiBody({ type: CreateDirectorDto })
    @ApiResponse({ status: 200, description: 'Director updated successfully.' })
    update (@Param('id') id: string, @Body() updateDirectorDto: CreateDirectorDto) {
        return this.directorsService.update(id, updateDirectorDto)
    }
}
