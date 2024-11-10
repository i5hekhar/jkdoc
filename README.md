## Description
# Purpose: Create a backend service using NestJS to manage user
authentication, document management, and ingestion controls.
o Key APIs:
▪ Authentication APIs: Register, login, logout, and handle user
roles (admin, editor, viewer).
▪ User Management APIs: Admin-only functionality for managing
user roles and permissions.
▪ Document Management APIs: CRUD operations for
documents, including the ability to upload documents.
▪ Ingestion Trigger API: Allows triggering the ingestion process
in the Python backend, possibly via a webhook or API call.
▪ Ingestion Management API: Tracks and manages ongoing
ingestion processes.

## Tools/Libraries:
▪ TypeScript for consistent type management.
▪ Database integration (Postgres recommended).
▪ JWT for authentication, with role-based authorization.

▪ Microservices architecture to facilitate interaction between
NestJS and the Python backend.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Run Migrations

```bash
# create migrations
$ npx sequelize-cli migration:generate --name create-user

# run migrations
$ npx sequelize-cli db:migrate

# Revert Migrations
$ npx sequelize-cli db:migrate:undo

# To undo all migrations, run:
$ npx sequelize-cli db:migrate:undo:all

```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Shekhar](https://linkedin.com/in/i5hekhar)
- Twitter - [@i5hekhar](https://twitter.com/i5hekhar)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
