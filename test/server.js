const app = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai

chai.use(chaiHttp)

describe('Endpoint /api/random', function () {
  it('returns status code 200', function (done) {
    chai
      .request(app)
      .get('/api/random')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })

  it('returns a number between 0-1023', function (done) {
    chai
      .request(app)
      .get('/api/random')
      .end((err, res) => {
        expect(res.body.random).to.be.within(0, 1023)
        done()
      })
  })
})

describe('Endpoint /api/custom_random/:num', function () {
  it('returns status code 200', function (done) {
    chai
      .request(app)
      .get('/api/custom_random/10')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })

  it('returns number between 0-5', function (done) {
    chai
      .request(app)
      .get('/api/custom_random/5')
      .end((err, res) => {
        expect(res.body.random).to.be.within(0, 5)
        done()
      })
  })

  it('returns number that not exceeds higher than 1000', function (done) {
    chai
      .request(app)
      .get('/api/custom_random/1000')
      .end((err, res) => {
        expect(res.body.random).to.not.be.above(1000)
        done()
      })
  })
})

describe('Endpoint /api/freddie', function () {
  it('returns status code 200', function (done) {
    chai
      .request(app)
      .post('/api/freddie')
      .send({
        name: 'Freddie',
      })
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })

  it('returns correct string with lenght of name', function (done) {
    chai
      .request(app)
      .post('/api/freddie')
      .send({
        name: 'Tom',
      })
      .end((err, res) => {
        expect(res.body.data).to.equal(
          `hej på dig, Tom. Ditt namn innehåller 3 bokstäver.`
        )
        done()
      })
  })
})


//VG-nivå TDD
describe('Endpoint /api/reverse-word/:word', function () {
  it('returns status code 200', function (done) {
    chai
      .request(app)
      .get('/api/reverse-word/katt')
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })

  it('returns ttak when sending katt', function (done) {
    chai
      .request(app)
      .get('/api/reverse-word/katt')
      .end((err, res) => {
        expect(res.body.word).to.equal('ttak')
        done()
      })
  })
})
