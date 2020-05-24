/* eslint-disable prefer-template */
process.env.NODE_ENV = 'test';

const chai = require('chai');

const { before, after } = require('mocha');

const { expect } = chai;
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Lobby = require('../src/db/models/lobbyModel');

const authenticatedUser = request.agent(app);
const unauthenticatedUser = request.agent(app);

before(done => {
  authenticatedUser.get('/auth/spotify').end(() => {
    done();
  });
});

describe('Lobbies', () => {
  beforeEach(done => {
    // Before each test we empty the database
    Lobby.deleteMany({}, () => {
      done();
    });
  });

  // Test the /GET route
  describe('/GET Lobby', () => {
    it('it should GET all the lobbies', done => {
      authenticatedUser.get('/lobbies').end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.length).to.be.equal(0);
        done();
      });
    });
  });

  // Test the /GET route unauthenticated
  describe('/GET Lobby Unauthenticated', () => {
    it('it should GET all the lobbies', done => {
      unauthenticatedUser.get('/lobbies').end((err, res) => {
        expect(res.statusCode).to.be.equal(302);
        done();
      });
    });
  });

  // Test the /POST route
  describe('/POST Lobby', () => {
    it('it should not POST a lobby without name field', done => {
      const lobby = {
        isPublic: true,
        createdBy: 'Richard',
        code: 'ABC',
      };
      authenticatedUser
        .post('/lobbies')
        .send(lobby)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
    });
    it('it should POST a lobby with valid body', done => {
      const lobby = {
        name: 'name',
        isPublic: true,
        code: 'ABC',
        users: [],
      };
      authenticatedUser
        .post('/lobbies')
        .send(lobby)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('isPublic');
          expect(res.body).to.have.property('createdBy');
          expect(res.body).to.have.property('code');
          expect(res.body).to.have.property('users');
          expect(res.body).to.have.property('songs');
          expect(res.body.users).to.have.length(1);
          done();
        });
    });
  });

  // Test the /GET/:id route
  describe('GET/:id Lobby', () => {
    it('it should GET a lobby by the given id', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Richard',
        code: 'ABC',
        users: [],
      });
      lobby.save((err, lobbyRes) => {
        authenticatedUser
          .get('/lobbies/' + lobbyRes.id)
          .send(lobby)
          .end((_err, res) => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('isPublic');
            expect(res.body).to.have.property('createdBy');
            expect(res.body).to.have.property('code');
            expect(res.body).to.have.property('users');
            expect(res.body).to.have.property('songs');
            expect(res.body)
              .to.have.property('_id')
              .equal(lobby.id);
            done();
          });
      });
    });
    it('it should return lobby not found when given a wrong id', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Richard',
        code: 'ABC',
        users: [],
      });
      lobby.save(() => {
        authenticatedUser
          .get('/lobbies/1231')
          .send(lobby)
          .end((_err, res) => {
            expect(res.statusCode).to.be.equal(404);
            expect(res.body)
              .to.have.property('message')
              .equal('lobby not found');
            done();
          });
      });
    });
  });

  // Test the /PUT/:id Lobby route
  describe('/PUT/:id Lobby', () => {
    it('it should UPDATE a lobby given the id', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Richard',
        code: 'ABC',
        users: [],
      });
      lobby.save((err, lobbyRes) => {
        authenticatedUser
          .put('/lobbies/' + lobbyRes.id)
          .send({ name: 'updatedTest' })
          .end((_err, res) => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.body)
              .to.have.property('name')
              .equal('updatedTest');
            done();
          });
      });
    });
    it('it should not update a lobby when given the wrong id', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Richard',
        code: 'ABC',
        users: [],
      });
      lobby.save(() => {
        authenticatedUser
          .put('/lobbies/asdfasldkfj')
          .send({ name: 'updatedTest' })
          .end((_err, res) => {
            expect(res.statusCode).to.be.equal(404);
            done();
          });
      });
    });
    it('it should not update a lobby when given an empty request body', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Richard',
        code: 'ABC',
        users: [],
      });
      lobby.save((err, lobbyRes) => {
        authenticatedUser
          .put('/lobbies/' + lobbyRes.id)
          .send({})
          .end((_err, res) => {
            expect(res.statusCode).to.be.equal(202);
            done();
          });
      });
    });
  });

  // Test the /PATCH/:id User route
  describe('/PATCH/:id User', () => {
    it('it should add a user to a lobby given the id', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Richard',
        code: 'ABC',
        users: [],
      });
      lobby.save((err, lobbyRes) => {
        authenticatedUser.patch('/lobbies/' + lobbyRes.id + '/users').end((_err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
      });
    });
    it('it should not add a user to a lobby given the wrong id', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Richard',
        code: 'ABC',
        users: [],
      });
      lobby.save(() => {
        authenticatedUser.patch('/lobbies/asdfdsfas/users').end((_err, res) => {
          expect(res.statusCode).to.be.equal(404);
          done();
        });
      });
    });
  });

  // Test the /PATCH/:id Song route
  describe('/PATCH/:id Song', () => {
    // it('it should add a song to a lobby given the id', done => {
    //   const lobby = new Lobby({
    //     name: 'test',
    //     isPublic: true,
    //     createdBy: 'Richard',
    //     code: 'ABC',
    //     users: [],
    //   });
    //   lobby.save((err, lobbyRes) => {
    //     authenticatedUser
    //       .patch('/lobbies/' + lobbyRes.id + '/songs')
    //       .send({ spotifyId: '2hnxrRNzF74mdDzpQZQukQ' })
    //       .end((_err, res) => {
    //         expect(res.statusCode).to.be.equal(200);
    //         expect(res.body).to.have.length(1);
    //         done();
    //       });
    //   });
    // });
    it('it should not add a song to a lobby given the wrong id', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Richard',
        code: 'ABC',
        users: [],
      });
      lobby.save(() => {
        authenticatedUser
          .patch('/lobbies/asdfdsfas/songs')
          .send({ spotifyId: '2hnxrRNzF74mdDzpQZQukQ' })
          .end((_err, res) => {
            expect(res.statusCode).to.be.equal(404);
            done();
          });
      });
    });
    // it('it should not add a song to a lobby given a bad spotifyId', done => {
    //   const lobby = new Lobby({
    //     name: 'test',
    //     isPublic: true,
    //     createdBy: 'Richard',
    //     code: 'ABC',
    //     users: [],
    //   });
    //   lobby.save((err, lobbyRes) => {
    //     authenticatedUser
    //       .patch('/lobbies/' + lobbyRes.id + '/songs')
    //       .send({ spotifyId: 'asdfasdf' })
    //       .end((_err, res) => {
    //         expect(res.statusCode).to.be.equal(400);
    //         done();
    //       });
    //   });
    // });
  });

  // Test the /DELETE/:id route
  describe('/DELETE/:id Lobby', () => {
    it('it should DELETE a lobby given the id', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Richard',
        code: 'ABC',
        users: [],
      });
      lobby.save((err, lobbyRes) => {
        authenticatedUser.delete('/lobbies/' + lobbyRes.id).end((_err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
      });
    });
    it('it should not DELETE a lobby when given the wrong id', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Richard',
        code: 'ABC',
        users: [],
      });
      lobby.save(() => {
        authenticatedUser.delete('/lobbies/1').end((_err, res) => {
          expect(res.statusCode).to.be.equal(404);
          done();
        });
      });
    });
  });

  describe('/DELETE/:id song', () => {
    it('it should DELETE a song given the lobby id and song id', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Edward',
        code: 'hi',
        songs: [
          {
            _id: '5ec9ea0722b3c34e21c94bbc',
            title: 'death bed (coffee for your head) (feat. beabadoobee)',
            artist: 'Powfu',
            addedBy: '5eb7b306cd7532103486fa8a',
            spotifySongId: '7eJMfftS33KTjuF7lTsMCx',
          },
        ],
        users: [],
      });
      lobby.save((err, lobbyRes) => {
        authenticatedUser
          .delete('/lobbies/' + lobbyRes.id + '/songs')
          .send({ id: '5ec9ea0722b3c34e21c94bbc' })
          .end((_err, res) => {
            expect(res.statusCode).to.be.equal(200);
            // console.log(res.body);
            // expect(res.body).to.have.length(0);
            done();
          });
      });
    });
  });

  describe('/DELETE/:id user', () => {
    it('it should DELETE a user given the lobby id and user id', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Edward',
        code: 'hi',
        songs: [],
        users: [
          {
            _id: '5e8994de73370a61e83e1695',
            username: 'edward.zhang',
            displayName: 'edward.zhang',
            spotifyId: 'edward.zhang',
            country: 'NZ',
            email: 'ez.zhang1999@gmail.com',
            thumbnail: 'true',
            profileUrl: 'https://open.spotify.com/user/edward.zhang',
            accessToken:
              'BQADU5BghhBa78v1Ap-kVYLxycHpWLQg8fq2ADGyFrBNYSQP1nQ3YAOaUbdx-gBJUzkQ57BVddcBl1ckGFhMty7bClHClcd-xvn876yrgRZNKDoaHLcR3gpcElw0bXk509rfez7Y2HMjbepd5G9Q-ZC8YKUFU4CSKPOPGZNdpr5ZCl4DmxvB_NG11SIvc7kMjTPiRmNzDyDpWPhrJV2KnqHzHNvMlvO6TmDhz0Rv2HzxMQ3X3McsbWbxGLW-y869GS8',
            refreshToken:
              'AQCEte0uXRfdacGqfnJAfs2cYqTiy4iY22-vdOcjKvQ3Q7lzVXIOhHYKUp_fLEnVYnCI04J7oxFa4Hd25fHwzaTmxKU3gnKmdHREgM33X3-FmzbQ8AGqzuc_nTRCkTEcJDI',
            __v: 0,
          },
        ],
      });
      lobby.save((err, lobbyRes) => {
        authenticatedUser
          .delete('/lobbies/' + lobbyRes.id + '/users')
          .send({ id: '5e8994de73370a61e83e1695' })
          .end((_err, res) => {
            expect(res.statusCode).to.be.equal(200);
            // expect(res.body).to.have.length(0);
            done();
          });
      });
    });
    it('it should not DELETE a user given the lobby id is incorrect', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Edward',
        code: 'hi',
        songs: [],
        users: [
          {
            _id: '5e8994de73370a61e83e1695',
            username: 'edward.zhang',
            displayName: 'edward.zhang',
            spotifyId: 'edward.zhang',
            country: 'NZ',
            email: 'ez.zhang1999@gmail.com',
            thumbnail: 'true',
            profileUrl: 'https://open.spotify.com/user/edward.zhang',
            accessToken:
              'BQADU5BghhBa78v1Ap-kVYLxycHpWLQg8fq2ADGyFrBNYSQP1nQ3YAOaUbdx-gBJUzkQ57BVddcBl1ckGFhMty7bClHClcd-xvn876yrgRZNKDoaHLcR3gpcElw0bXk509rfez7Y2HMjbepd5G9Q-ZC8YKUFU4CSKPOPGZNdpr5ZCl4DmxvB_NG11SIvc7kMjTPiRmNzDyDpWPhrJV2KnqHzHNvMlvO6TmDhz0Rv2HzxMQ3X3McsbWbxGLW-y869GS8',
            refreshToken:
              'AQCEte0uXRfdacGqfnJAfs2cYqTiy4iY22-vdOcjKvQ3Q7lzVXIOhHYKUp_fLEnVYnCI04J7oxFa4Hd25fHwzaTmxKU3gnKmdHREgM33X3-FmzbQ8AGqzuc_nTRCkTEcJDI',
            __v: 0,
          },
        ],
      });
      lobby.save(() => {
        authenticatedUser
          .delete('/lobbies/123/users')
          .send({ id: '5e8994de73370a61e83e1695' })
          .end((_err, res) => {
            expect(res.statusCode).to.be.equal(400);
            expect(res.body).to.have.property('message');
            // expect(res.body).to.have.length(0);
            done();
          });
      });
    });
  });

  describe('/GET/:id song current', () => {
    it('it should GET the current song given the lobby id', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Edward',
        code: 'hi',
        songs: [
          {
            _id: '5eca03e4b9985009f81aab5c',
            title: 'Concierto de Aranjuez for Guitar and Orchestra: 2. Adagio',
            artist: 'Joaquín Rodrigo',
            addedBy: '5e8994de73370a61e83e1695',
            spotifySongId: '0DvLcwb4v0rPmJ8S8R9thy',
          },
          {
            _id: '5eca03efb9985009f81aab5d',
            title: 'Egmont Overture, Op. 84 - Remastered',
            artist: 'Ludwig van Beethoven',
            addedBy: '5e8994de73370a61e83e1695',
            spotifySongId: '1EjfCGPicAauZwnbFrTczK',
          },
        ],
        users: [],
      });
      lobby.save((err, lobbyRes) => {
        authenticatedUser.get('/lobbies/' + lobbyRes.id + '/songs/current').end((_err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body._id).to.be.equal('5eca03e4b9985009f81aab5c');
          expect(res.body.title).to.be.equal(
            'Concierto de Aranjuez for Guitar and Orchestra: 2. Adagio',
          );
          expect(res.body.artist).to.be.equal('Joaquín Rodrigo');
          expect(res.body.spotifySongId).to.be.equal('0DvLcwb4v0rPmJ8S8R9thy');
          done();
        });
      });
    });
  });

  describe('/GET/:id song timestamp', () => {
    it('it should GET the timestamp of the song playing in the lobby', done => {
      const lobby = new Lobby({
        name: 'test',
        isPublic: true,
        createdBy: 'Edward',
        code: 'hi',
        songs: [],
        users: [],
      });
      lobby.save((err, resLobby) => {
        authenticatedUser.get('/lobbies/' + resLobby.id + '/songs/timestamp').end((_err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
      });
    });
  });

  describe('Authentication check', () => {
    it('should return 200 response when user is logged in', done => {
      authenticatedUser.get('/account').end((req, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect('Location', '/');
        done();
      });
    });
    it('should return 302 response unauthenticated user accesses /account', done => {
      unauthenticatedUser.get('/account').end((req, res) => {
        expect(res.statusCode).to.be.equal(302);
        expect('Location', '/');
        done();
      });
    });
    it('should return 200 response when authenticated user goes on landing page', done => {
      authenticatedUser.get('/').end((req, res) => {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
    it('should return 200 response when unauthenticated user goes on landing page', done => {
      unauthenticatedUser.get('/').end((req, res) => {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
    it('should return 200 response when authenticated user accesses lobbies', done => {
      authenticatedUser.get('/lobbies').end((req, res) => {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
    it('should return 302 response when unauthenticated user accesses lobbies', done => {
      unauthenticatedUser.get('/lobbies').end((req, res) => {
        expect(res.statusCode).to.be.equal(302);
        done();
      });
    });
  });

  after(async () => {
    mongoose.connection.close();
  });
});
