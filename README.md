# SIMUL

Simul is a Spotify music syncing application. It allows you to join lobbies to listen to what everyone else is listening to. You can add songs to the song queue for the lobby and everyone listening to that queue will have their music in sync.

## Getting Started

---

These instructions will get you a copy of the project up and running on your local machine for development and testing.

### Prerequisites

- A Spotify Premium account
- Node.js
- NPM

### Installing

After cloning the repository, and you have navigated to the top level directory

```
cd frontend
npm install
cd ../server
npm install
```

### Running locally

There are two separate projects. One is for the server, and another for the frontend. After installing dependencies, run `npm start` on both the server and frontend directory.

The server should start up on `localhost:8888`, and the frontend should start up on `localhost:3000`.

### Running the tests

Run `npm test` on both the server and frontend directory to test each project.

To check code style, run the following in each project:

```
npx eslint --fix src
```

## Authors

---

| Name         | upi     |
| ------------ | ------- |
| Allen Nian   | ania716 |
| Richard Ng   | rng448  |
| Edward Zhang | ezha731 |
| Brian Nguyen | bugn877 |

## License

---

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
