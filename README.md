<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<H1 align="center">Library NestJS API</H1>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Library NestJS API

## Configuration environment variables

```env
DB_URI=mongodb://mongo:27017/library-next-api

JWT_SECRET=your-secret-jwt
JWT_EXPIRES=3d

```

## Running the app

```bash
$ docker compose up --build

```

## Test

```bash
docker exec -it nest-app /bin/sh

$ npm run test

```

## Documentation API

```bash
http://localhost:3333/api/docs

```
