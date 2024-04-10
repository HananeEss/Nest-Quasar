import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MoviesModule } from './movies/movies.module'
import { ActorsModule } from './actors/actors.module'
import { DirectorsService } from './directors/directors.service'
import { DirectorsModule } from './directors/directors.module'
import { MoviesRevenuesModule } from './movies_revenues/movies_revenues.module'

@Module({
    imports: [MoviesModule, ActorsModule, DirectorsModule, MoviesRevenuesModule],
    controllers: [AppController],
    providers: [AppService, DirectorsService],
})
export class AppModule {
}
