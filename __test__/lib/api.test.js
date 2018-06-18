'use strict';


const superagent = require('superagent');

import app from '../../src/app';



describe('Writing Response Tests For Cookie.js', ()=> {

    beforeAll(() => {
        app.start(3001);
    });

    afterAll(() => {
        app.stop();
    });

    it('return a status code of 404 for un-registered routes', () => {
  
        return superagent.get('http://localhost:3001/api/v1/taco')
        .catch(res => {
          expect(res.status).toBe(404);
          
        });
    });
  
    it('404 response on a GET, should respond with "not found" for valid requests made with an id that was not found', () => {

        return superagent
      .get('http://localhost:3001/api/v1/cookie/tacocat')
      .catch(err => {
        expect(err.response.text).toBe('not found');
        expect(err.status).toBe(404);
      });
    });

    it('test 400 on a GET, should respond with "bad request" if no id was provided in the request', () => {
        superagent
      .get('http://localhost:3001/api/v1/cookie')
      .catch(res => {
        expect(res.status).toBe(400);
        expect(res.response.text).toEqual('bad request');
        done();
        });
    });

    it('test 200 on a GET, should contain a response body for a request made with a valid id', () => {
        return superagent
      .get('http://localhost:3001/api/v1/cookie/')
      .send({
        flavor: 'Oatmeal',
        size: 'Large',
      })
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
      })
      .catch(res => console.error(res));
    });

    it('test 400 on a POST, it should respond with "bad request" if no request body was provided or the body was invalid', () => {
        return superagent
      .post('http://localhost:3001/api/v1/cookie')
      .catch(err => {
        expect(err.response.text).toBe('bad request');
        expect(err.status).toBe(400);

  
      });
    });

    it('test 200 on a POST, it should respond with the body content for a post request with a valid body', () => {
        return superagent
      .post('http://localhost:3001/api/v1/cookie/')
      .send({
        flavor: 'Oatmeal',
        size: 'Large',
        
      })
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
      })
      .catch(res => console.error(res));
  
    });
});

