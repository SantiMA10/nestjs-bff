# nest.js with the bff pattern [![CI/CD](https://github.com/SantiMA10/nestjs-bff/actions/workflows/cicd.yml/badge.svg)](https://github.com/SantiMA10/nestjs-bff/actions/workflows/cicd.yml)

This project contains two [nest.js](https://nestjs.com/): one acting as a backend API and the other as a [BFF (or backend for fronted)](https://samnewman.io/patterns/architectural/bff/). The monorepo is managed using [turborepo](https://turborepo.org/).

# Getting Started

Since this projects uses yarn workspaces and turborepo we can run a few common scripts in all the services at once.

```bash
yarn install

yarn build // builds all the projects

yarn test:unit // runs all the unit tests
yarn test:e2e // runs all the e2e test 

yarn start:prod // runs both projects in production mode (backend http://localhost:5000 - bff http://localhost:3000)
yarn start:dev // runs both projects in watch mode (backend http://localhost:5000 - bff http://localhost:3000)
```

More information about each service in each README.md file.