# MERN Boilerplate

A simple web application that serves as a boilerplate to quickly develop MERN stack applications.  This project makes use of [MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React](https://reactjs.org/), and [Node.js](https://nodejs.org/en/).  This boilerplate already includes authentication/authorization thanks to [Passport](http://www.passportjs.org/) and provides support for [Sass](https://sass-lang.com/).

## Dependencies

- [Node.js](https://nodejs.org/en/download/)

After installing Node and cloning the repository, set your environment variables inside of a `.env` file like this:

```zsh
JWT=# JWT Secret here
MONGO=# MongoDB URI here
```

Once the environment variables are set, we install dependencies by running:

```zsh
npm run setup
```

## Start

To start the backend server, run:

```zsh
npm run server
```

To start the frontend client, run:

```zsh
npm run client
```

To start the server and the client simultaneously, run:

```zsh
npm run dev
```
