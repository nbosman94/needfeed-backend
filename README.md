## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Local Set up - Authentication

```bash
$ npm install --save @nestjs/passport passport passport-local
$ npm install --save-dev @types/passport-local

$ npm install --save @nestjs/jwt

$ npm install passport-jwt
$ npm i --save-dev @types/passport-jwt

npm i bcrypt

```

## User Access Issue with DB

Ensure postgres services are running

```bash
brew services list

brew services start postgresql

```

```bash
$ psql postgres

```

Connect to postgres shell

```bash
$ psql postgres

```

Run this in the postgre shell:

```
postgres=# CREATE DATABASE "needfeed-db";
CREATE DATABASE
postgres=# GRANT ALL PRIVILEGES ON DATABASE "needfeed-db" TO myuser;
ALTER DATABASE "needfeed-db" OWNER TO myuser;
GRANT
ALTER DATABASE
postgres=# \l
                                     List of databases
    Name      |     Owner     | Encoding |   Collate   |    Ctype    |   Access privileges
---------------+---------------+----------+-------------+-------------+-----------------------
natashabosman | natashabosman | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
needfeed-db   | myuser        | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =Tc/myuser           +
              |               |          |             |             | myuser=CTc/myuser
postgres      | postgres      | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
template0     | postgres      | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
              |               |          |             |             | postgres=CTc/postgres
template1     | postgres      | UTF8     | en_US.UTF-8 | en_US.UTF-8 | =c/postgres          +
              |               |          |             |             | postgres=CTc/postgres
(5 rows)

postgres=# \q

```

## Seed Database

Once backend is running

```bash
$ npm run start: dev
```

And docker container is running

```bash

$ docker compose up

```

Then run the following command to add data to the DB

```bash
npx prisma db seed

```

To visualise this data, run

```bash
npx prisma studio

```
