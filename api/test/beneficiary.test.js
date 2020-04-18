const server = require('../server');
const request = require('supertest')(server);
const assert = require('assert');
const data = require('schemas/beneficiary.schema');
const mongoose = require('config/mongo');
const model = mongoose.model(data.Collection, data.Schema);

describe('CRUD beneficiary', () => {
  const beneficiary = {
    name: 'Teste',
    cpf: 11111111111,
    rg: 1111,
    birth_date: "2020-04-22",
    plan: "Basic"
  };
  let id;
  let token;

  before(() => {
    request
    .post('/auth')
    .send({ user: 'adm', pass: 'adm' })
    .then(result => {
      token = result.body.token;
    });
   });

  beforeEach((done) => {
    model.create(beneficiary, (err, data) => {
      id = String(data._id);
      done();
    });
  });

  afterEach(done => {
    model.deleteMany({}, done);
  });

  it('GET /beneficiaries should list', () => {
    return request.get('/beneficiaries').set('x-jwt', token).then(result => {
      assert.equal(result.status, 200);
      assert.ok(result.body.items.length > 0);
      assert.ok(result.body.total > 0);
      assert.ok(result.body.items[0].name);
    });
  });
  it('GET /beneficiaries should filter by name', () => {
    return request.get('/beneficiaries?name=e').set('x-jwt', token).then(result => {
      assert.equal(result.status, 200);
      assert.ok(result.body.items.length > 0);
      assert.ok(result.body.total > 0);
      assert.ok(result.body.items[0].name);
    });
  });
  it('GET /beneficiaries/:id show a beneficiary', () => {
    return request.get(`/beneficiaries/${id}`).set('x-jwt', token).then(result => {
      assert.equal(result.status, 200);
      assert.equal(result.body.name, beneficiary.name);
    });
  });
  it('GET /beneficiaries/:id of a invalid id', () => {
    return request.get('/beneficiaries/banana').set('x-jwt', token).then(result => {
      assert.equal(result.status, 422);
      assert.equal(result.body.err, 'invalid mongo id');
    });
  });
  it('GET /beneficiaries/:id of a invalid id', () => {
    return request.get(`/beneficiaries/${id}a`).set('x-jwt', token).then(result => {
      assert.equal(result.status, 422);
      assert.equal(result.body.err, 'invalid mongo id');
    });
  });
  it('POST /beneficiaries creates a beneficiary', () => {
    const beneficiary = {
      name: 'Teste 3',
      cpf: 33333333333,
      rg: 222222,
      birth_date: "2020-04-27",
      plan: "Standard",
      dependents: 1
    };
    return request.post('/beneficiaries').set('x-jwt', token).send(beneficiary).then(result => {
      assert.equal(result.status, 201);
      assert.equal(result.body.dependents, 1);
    });
  });
  it('PUT /beneficiaries/:id updates a beneficiary', () => {
    const beneficiary = { name: 'Ibrahim' };
    return request.put(`/beneficiaries/${id}`).set('x-jwt', token).send(beneficiary).then(result => {
      console.log(result.body);
      assert.equal(result.status, 200);
      assert.deepEqual(result.body, {n: 1, nModified: 1, ok: 1 });
    });
  });
  it('PUT /beneficiaries/:id of a invalid id', () => {
    return request.put('/beneficiaries/banana').set('x-jwt', token).then(result => {
      assert.equal(result.status, 422);
      assert.equal(result.body.err, 'invalid mongo id');
    });
  });
  it('PUT /beneficiaries/:id of a invalid id', () => {
    return request.put(`/beneficiaries/${id}a`).set('x-jwt', token).then(result => {
      assert.equal(result.status, 422);
      assert.equal(result.body.err, 'invalid mongo id');
    });
  });
  it('DELETE /beneficiaries/:id removes a beneficiary', () => {
    return request.delete(`/beneficiaries/${id}`).set('x-jwt', token).then(result => {
      assert.equal(result.status, 204);
    });
  });
  it('DELETE /beneficiaries/:id of a invalid id', () => {
    return request.delete('/beneficiaries/banana').set('x-jwt', token).then(result => {
      assert.equal(result.status, 422);
      assert.equal(result.body.err, 'invalid mongo id');
    });
  });
  it('DELETE /beneficiaries/:id of a invalid id', () => {
    return request.delete(`/beneficiaries/${id}a`).set('x-jwt', token).then(result => {
      assert.equal(result.status, 422);
      assert.equal(result.body.err, 'invalid mongo id');
    });
  });
});
