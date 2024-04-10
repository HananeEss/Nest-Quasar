import { Module } from '@nestjs/common';
import { MoviesRevenuesService } from './movies_revenues.service';
import { MoviesRevenuesController } from './movies_revenues.controller'

@Module({
  providers: [MoviesRevenuesService],
  controllers: [MoviesRevenuesController]
})
export class MoviesRevenuesModule {}
