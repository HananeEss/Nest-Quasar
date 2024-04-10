-- CreateTable
CREATE TABLE "movies_actors" (
    "movie_id" INTEGER NOT NULL,
    "actor_id" INTEGER NOT NULL,

    CONSTRAINT "movies_actors_pkey" PRIMARY KEY ("movie_id","actor_id")
);

-- CreateTable
CREATE TABLE "movies" (
    "movie_id" SERIAL NOT NULL,
    "movie_name" VARCHAR(100) NOT NULL,
    "movie_length" INTEGER,
    "movie_lang" VARCHAR(20) NOT NULL,
    "age_certificate" VARCHAR(10) NOT NULL,
    "release_date" TIMESTAMP(3),
    "director_id" INTEGER NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("movie_id")
);

-- CreateTable
CREATE TABLE "actors" (
    "actor_id" SERIAL NOT NULL,
    "first_name" VARCHAR(150) NOT NULL,
    "last_name" VARCHAR(150) NOT NULL,
    "gender" CHAR(100),
    "date_of_birth" TIMESTAMP(3),
    "add_date" TIMESTAMP(3),
    "update_date" TIMESTAMP(3),

    CONSTRAINT "actors_pkey" PRIMARY KEY ("actor_id")
);

-- CreateTable
CREATE TABLE "directors" (
    "director_id" SERIAL NOT NULL,
    "first_name" VARCHAR(150) NOT NULL,
    "last_name" VARCHAR(150) NOT NULL,
    "date_of_birth" TIMESTAMP(3),
    "nationality" VARCHAR(20) NOT NULL,
    "add_date" TIMESTAMP(3),
    "update_date" TIMESTAMP(3),

    CONSTRAINT "directors_pkey" PRIMARY KEY ("director_id")
);

-- CreateTable
CREATE TABLE "movies_revenues" (
    "revenue_id" SERIAL NOT NULL,
    "movie_id" INTEGER NOT NULL,
    "revenues_domestic" DOUBLE PRECISION,
    "revenues_international" DOUBLE PRECISION,

    CONSTRAINT "movies_revenues_pkey" PRIMARY KEY ("revenue_id")
);

-- AddForeignKey
ALTER TABLE "movies_actors" ADD CONSTRAINT "movies_actors_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("movie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies_actors" ADD CONSTRAINT "movies_actors_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "actors"("actor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_director_id_fkey" FOREIGN KEY ("director_id") REFERENCES "directors"("director_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies_revenues" ADD CONSTRAINT "movies_revenues_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("movie_id") ON DELETE RESTRICT ON UPDATE CASCADE;
