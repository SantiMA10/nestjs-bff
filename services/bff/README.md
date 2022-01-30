# bff

This project is build using [nest.js](https://nestjs.com/) and contains the public API for the frontend application. This project depends on `backend`.

# Getting Started

## Installation

You can skip this step if you already run yarn install in the project root.

```bash
yarn install 
```

## Configuration

This projects uses a `.env` file for each environment to configure the host of the backend project, make sure you have your `.env` files update to test it, run it locally or deploy it.

- `.env.test`: the one used during the tests
- `.env.development`: the one used when the NODE_ENV env var is set to any that is not `production`
- `.env.production`: the one used when the NODE_ENV env var is set to `production`

## Running the app

```bash
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```

## Test

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```
