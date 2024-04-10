import { ApiProperty } from '@nestjs/swagger'

export class DirectorDto {

    @ApiProperty()
    director_id: number

    @ApiProperty()
    first_name: string

    @ApiProperty()
    last_name: string
}
