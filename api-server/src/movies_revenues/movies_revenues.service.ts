// movies-revenues.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { MoviesRevenues, PrismaClient } from '@prisma/client'
import { CreateMoviesRevenuesDto } from '../common/dto/create-movies-revenues.dto'
import { UpdateMoviesRevenuesDto } from '../common/dto/update-movies-revenues.dto'

const prisma = new PrismaClient()

@Injectable()
export class MoviesRevenuesService {

    async fetchAll (): Promise<MoviesRevenues[]> {
        return await prisma.moviesRevenues.findMany()
    }

    async fetchById (id: string): Promise<MoviesRevenues> {
        const moviesRevenuesWhere = { revenue_id: parseInt(id) }
        const moviesRevenues = await prisma.moviesRevenues.findUnique({ where: moviesRevenuesWhere })
        if (!moviesRevenues) {
            throw new NotFoundException(`MoviesRevenues with id ${id} does not exist.`)
        }
        return moviesRevenues
    }

    async fetchByMovieId (movieId: string): Promise<MoviesRevenues[]> {
        return await prisma.moviesRevenues.findMany({ where: { movie_id: parseInt(movieId) } })
    }

    async update (id: string, updateMoviesRevenuesDto: CreateMoviesRevenuesDto): Promise<MoviesRevenues> {
        const existingMoviesRevenues = await this.fetchById(id)

        if (!existingMoviesRevenues) {
            throw new NotFoundException(`MoviesRevenues with id ${id} does not exist.`)
        }

        const moviesRevenuesWhere = { revenue_id: existingMoviesRevenues.revenue_id }

        return await prisma.moviesRevenues.update({ where: moviesRevenuesWhere, data: updateMoviesRevenuesDto })
    }
}
