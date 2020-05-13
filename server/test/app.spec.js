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
        users: [],
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
        createdBy: 'asdf',
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
            expect(res.body)
              .to.have.property('_id')
              .equal(lobby.id);
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
  describe('/DELETE:id Lobby', () => {
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
  });
  // it('it should not DELETE a lobby when given the wrong id', done => {
  //   const lobby = new Lobby({
  //     name: 'test',
  //     isPublic: true,
  //     createdBy: 'Richard',
  //     code: 'ABC',
  //     users: [],
  //   });
  //   lobby.save(() => {
  //     authenticatedUser.delete('/lobbies/asdfasdfasdf').end((_err, res) => {
  //       expect(res.statusCode).to.be.equal(404);
  //       done();
  //     });
  //   });
  // });
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
