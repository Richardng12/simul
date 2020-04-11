/* eslint-disable prefer-template */
process.env.NODE_ENV = 'test';

const chai = require('chai');

const { before } = require('mocha');

const { expect } = chai;
const request = require('supertest');
const app = require('../app');

const authenticatedUser = request.agent(app);
const unauthenticatedUser = request.agent(app);

describe('GET /account', () => {
  before(done => {
    authenticatedUser.get('/auth/spotify').end(() => {
      done();
    });
  });

  it('should return 200 response when user is logged in', done => {
    authenticatedUser.get('/account').end((req, res) => {
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
  it('should return 302 response when user is logged in', done => {
    unauthenticatedUser.get('/account').end((req, res) => {
      expect(res.statusCode).to.be.equal(302);
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
