import { Injectable, NotFoundException } from '@nestjs/common';
import { Actor, Movie, PrismaClient } from '@prisma/client';
import { CreateMovieDto } from '../common/dto/create-movie.dto';

const prisma = new PrismaClient();

@Injectable()
export class MoviesService {
  async fetchAll(): Promise<Movie[]> {
    return await prisma.movie.findMany();
  }

  async fetchById(id: string): Promise<Movie> {
    const movieWhere = { movie_id: parseInt(id) };
    const movie = await prisma.movie.findUnique({
      where: movieWhere,
    });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} does not exist.`);
    }
    return movie;
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const parsedDateOfBirth = new Date(createMovieDto.release_date);

    return await prisma.movie.create({
      data: {
        movie_name: createMovieDto.movie_name,
        movie_length: createMovieDto.movie_length,
        movie_lang: createMovieDto.movie_lang,
        age_certificate: createMovieDto.age_certificate,
        release_date: parsedDateOfBirth,
        director_id: createMovieDto.director_id,
      },
    });
  }

  async update(id: string, updateMovieDto: CreateMovieDto): Promise<Movie> {
    const existingMovie = await this.fetchById(id);

    if (!existingMovie) {
      throw new NotFoundException(`Movie with id ${id} does not exist.`);
    }

    const parsedDateOfBirth = new Date(updateMovieDto.release_date);

    const movieWhere = { movie_id: existingMovie.movie_id };

    updateMovieDto.release_date = parsedDateOfBirth;

    return await prisma.movie.update({
      where: movieWhere,
      data: updateMovieDto,
    });
  }

  async getActorsByMovieId(movieId: number): Promise<Actor[]> {
    const actors = await prisma.moviesActors.findMany({
      where: { movie_id: movieId },
      include: {
        actor: true,
      },
    });

    if (!actors || actors.length === 0) {
      throw new NotFoundException(
        `No actors found for movie with id ${movieId}.`,
      );
    }

    return actors.map((moviesActor) => moviesActor.actor);
  }
}
