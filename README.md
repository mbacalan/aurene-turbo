# Aurene

A monorepo for AureneBot and AureneDashboard, a Discord bot and it's management website.

Check out their folders inside `apps/bot` and `apps/dashboard` for more information on each project.

## What's inside?

This turborepo uses [NPM](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `bot`: a Discord bot using [Discord.js](https://discord.js.org)
- `dashboard`: a [Nuxt.js](https://nuxtjs.org) app for managing `bot`
- `database`: a MongoDB instance shared between `bot` and `dashboard`
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Build

To build all apps and packages:

```
npm run build
```

**NOTE: Currently, Nuxt needs have it's npm packages installed seperately. If builds fail, run `npm install` inside `apps/dashboard` and try again.**

### Develop

To develop all apps and packages:

```
npm run dev
```
