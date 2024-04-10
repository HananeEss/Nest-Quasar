// create-director.dto.ts
import { IsDate, IsDateString, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateDirectorDto {

    @ApiProperty({ description: 'First name of the director', example: 'John' })
    @IsString()
    readonly first_name: string

    @ApiProperty({ description: 'Last name of the director', example: 'Doe' })
    @IsString()
    readonly last_name: string

    @ApiProperty({
        description: 'Date of birth of the director in ISO-8601 format',
        example: '1990-01-01',
        required: false
    })
    @IsOptional()
    @IsDate()
    date_of_birth?: Date

    @ApiProperty({ description: 'Nationality of the director', example: 'American' })
    @IsString()
    readonly nationality: string
}
