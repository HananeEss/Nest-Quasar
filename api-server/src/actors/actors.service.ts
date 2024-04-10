import { Injectable, NotFoundException } from '@nestjs/common'
import { Actor, PrismaClient } from '@prisma/client'
import { CreateActorDto } from '../common/dto/create-actor.dto'

const prisma = new PrismaClient()

@Injectable()
export class ActorsService {

    async fetchAll (): Promise<Actor[]> {
        return await prisma.actor.findMany()
    }

    async fetchById (id: string): Promise<Actor> {
        const actorWhere = { actor_id: parseInt(id) }
        const actor = await prisma.actor.findUnique({ where: actorWhere })
        if (!actor) {
            throw new NotFoundException(`Actor with id ${id} does not exist.`)
        }
        return actor
    }

    async create (createActorDto: CreateActorDto): Promise<Actor> {

        const parsedDateOfBirth = new Date(createActorDto.date_of_birth)

        return await prisma.actor.create({
            data: {
                first_name: createActorDto.first_name,
                last_name: createActorDto.last_name,
                gender: createActorDto.gender,
                date_of_birth: parsedDateOfBirth,
            }
        })
    }

    async update (id: string, updateActorDto: CreateActorDto): Promise<Actor> {
        const existingActor = await this.fetchById(id)

        if (!existingActor) {
            throw new NotFoundException(`Actor with id ${id} does not exist.`)
        }

        const parsedDateOfBirth = new Date(updateActorDto.date_of_birth)

        const actorWhere = { actor_id: existingActor.actor_id }

        updateActorDto.date_of_birth = parsedDateOfBirth

        return await prisma.actor.update({ where: actorWhere, data: updateActorDto })
    }
}
