// create-actor.dto.ts
import { IsDate, IsOptional, IsString } from 'class-validator'

export class CreateActorDto {
    @IsString()
    first_name: string

    @IsString()
    last_name: string

    @IsOptional()
    @IsString()
    gender?: string

    @IsOptional()
    @IsDate()
    date_of_birth?: Date
}
