// directors.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { Director, PrismaClient } from '@prisma/client'
import { CreateDirectorDto } from '../common/dto/create-director.dto'

const prisma = new PrismaClient()

@Injectable()
export class DirectorsService {

    async fetchAll (): Promise<Director[]> {
        return await prisma.director.findMany()
    }

    async fetchById (id: string): Promise<Director> {
        const directorWhere = { director_id: parseInt(id) }
        const director = await prisma.director.findUnique({ where: directorWhere })
        if (!director) {
            throw new NotFoundException(`Director with id ${id} does not exist.`)
        }
        return director
    }

    async create (createDirectorDto: CreateDirectorDto): Promise<Director> {

        const parsedDateOfBirth = new Date(createDirectorDto.date_of_birth)

        return await prisma.director.create({
            data: {
                first_name: createDirectorDto.first_name,
                last_name: createDirectorDto.last_name,
                date_of_birth: parsedDateOfBirth,
                nationality: createDirectorDto.nationality,
            }
        })
    }

    async update (id: string, updateDirectorDto: CreateDirectorDto): Promise<Director> {
        const existingDirector = await this.fetchById(id)

        if (!existingDirector) {
            throw new NotFoundException(`Director with id ${id} does not exist.`)
        }

        const parsedDateOfBirth = new Date(updateDirectorDto.date_of_birth)

        const directorWhere = { director_id: existingDirector.director_id }

        updateDirectorDto.date_of_birth = parsedDateOfBirth

        return await prisma.director.update({ where: directorWhere, data: updateDirectorDto })
    }
}
