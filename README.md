# Bump bot

2 moderation type commands: !setChannel !setDescription
1 api type command: !bump (every hour)
1 api integration: top.gg, every upvote grant a free bump (https://top.gg/api/docs#jslib)

## Getting started
### prerequisite:
- node 10+
- mongodb

### Configuration with .env
Copy the file `.env.template` as `.env` and fill it
```
DISCORD_API_TOKEN=
DISCORD_CLIENT_ID=
MONGO_URL=
TOP_GG_TOKEN=
TOP_GG_HOOK_PORT=
TOP_GG_HOOK_PASSWORD=
```

If you prefer, you can just set environnement variables.
 
### Install and start

- install the dependencies:
`npm install`

- run the bot
`npm start`


## Endpoints

- [GET] /discord/bot-invite
helper method that redirect to the bot invite link

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Environnement variables

.env files supported

- PORT : default 5000
- DISCORD_API_TOKEN
- DISCORD_CLIENT_ID
- MONGO_URL
- TOP_GG_TOKEN
- TOP_GG_HOOK_PORT
- TOP_GG_HOOK_PASSWORD

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

