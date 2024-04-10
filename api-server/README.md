## Installation

```bash
$ npm install
```

## Running the docker

```bash
$ docker run --name bootCamp -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=admin -d postgres:12-alpine

Fill the database with the script data 
```

## Running the app

```bash
$ npm run start
```
