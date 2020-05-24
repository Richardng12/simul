# SIMUL

Simul is a Spotify music syncing application. It allows you to join lobbies to listen to what everyone else is listening to. You can add songs to the song queue for the lobby and everyone listening to that queue will have their music in sync.

![FrontPage](https://user-images.githubusercontent.com/37729449/82751848-3ab6a300-9e0e-11ea-9aa7-fa696893f29d.png)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing.

### Prerequisites

- A Spotify Premium account (although with a free account the user can still enter the app, but will not be able to listen to songs)
- Node.js
- NPM

### Installing dependencies

After cloning the repository, navigate to the the `server`/`frontend` directories. In each directory, enter the following command to install dependencies for that project.

```
npm install
```

### Running locally

There are two separate projects. One is for the server, and another for the frontend. After installing dependencies, run `npm start` on both the server and frontend directories. Errors will be thrown if npm dependencies have not been installed.

The server should start up on `localhost:8888`, and the frontend should start up on `localhost:3000`.

### Running the tests

Run `npm test` on both the server and frontend directory to test each project.

To check code style, run the following in each project:

```
npx eslint src
```

## Features

### Lobbies

After successfully logging into the application with Spotify. The user will be greeted with the lobby selection page. The user can enter a lobby that has been created by another user, or they can create their own lobby, where other users can join.

![Image of Lobby](https://user-images.githubusercontent.com/37729449/82752276-042e5780-9e11-11ea-8c06-5d4ec27955df.png)


A lobby creation pop-up will appear when adding a lobby. The user will be given a choice to create a public lobby, where anyone is allowed to join, or they could create a private lobby where only the people who know the password to that lobby can join. If a user no longer wishes to keep that lobby, they will be allowed to delete the lobby that they have created.

![Image of lobby creation](https://scontent-syd2-1.xx.fbcdn.net/v/t1.15752-9/99284165_232368678065810_2785059886549958656_n.png?_nc_cat=110&_nc_sid=b96e70&_nc_oc=AQkxfuVah9hzghN1V68Az-t-ogw8Nc_jMe9snJyD-u52BceWKZbSexwu-oTQXIpBk6M&_nc_ht=scontent-syd2-1.xx&oh=4341a57461c7a9dc523e31bd00a381d4&oe=5EEE4387)

### Music Page

Once a user enters a lobby, they will see this page for their respective lobby. They will be able to add songs to the lobby using the search. The search links to Spotify's search function so all songs on Spotify can be searched for.

Once a user clicks on the song in the search dropdown, the song will be added to the queue for every member of the lobby.

Users will be able to delete the songs that they have added to the queue, shown by an X next to the song in the queue.

All members of the lobby will have their music in sync, but will not be allowed to pause. The users will be able to mute or change the volume of the music if they wish. Once a user enters the lobby, the music automatically jumps to the timestamp of the song in which everyone else is playing and the song will play automatically.

Other song information such as artist, song title and lyrics are displayed on the left. The lyrics displayed here are the full lyrics unlike that in Spotify where they keep changing to ads when lyrics are shown.

The users in the lobby will be allowed to chat to one another.

![Image of music player](https://user-images.githubusercontent.com/37729449/82752338-769f3780-9e11-11ea-835b-2ae76cf4cdf1.png)

## Authors

| Name         | upi     |
| ------------ | ------- |
| Allen Nian   | ania716 |
| Richard Ng   | rng448  |
| Edward Zhang | ezha731 |
| Brian Nguyen | bugn877 |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
