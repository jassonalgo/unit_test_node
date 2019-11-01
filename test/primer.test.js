
var supertest = require('supertest')
var should = require('should')
var http = require('should-http')
var ConfigTest = require('../config')
const config = new ConfigTest(process.env.NODE_ENV)

// This agent refers to PORT where program is runninng.

var server = supertest.agent(config.urlDomain)

// UNIT test begin

describe('Pruebas unitarias para categorias', function () {
  // #1 should return home page

  it('respuesta exitosa', function (done) {
    // calling home page api
    server
      .get(config.services.categories.path)
      .set('Content-type', config.header)
      .set('X-api-key', 'hello-world')
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        // console.log(err)
        // codigo de respuesta http

        res.should.have.status(200)
        // se valida cabezera de json api
        res.should.have.contentType(config.header)
        // se valida que vengan el objeto data, sea un array y tenga un minimo de propiedades
        res.body.should.have.properties('data').and.instanceof(Object)
        // res.body.data.should.instanceof(Object)
        res.body.should.have.properties(['data', 'errors', 'status'])
        // se valida que el campo errors este vacio
        res.body.errors.should.be.empty()
        // se valida estado en respuesta
        res.body.status.should.equal('Success')
        // se valida mensaje de respuesta
        res.body.data['categories'].should.instanceof(Object).and.not.empty()
        // se valida que este el atributo de tipo
        res.body.data['type'].should.equal('Categories list')
        // se valida propiedades de las categorias
        if (Array.isArray(res.body.data['categories']) && (res.body.data['categories']).length > 1) {
          // se valida que el elemento sea un objeto
          for (var i = 0; i < res.body.data['categories'].length; i++) {
            res.body.data['categories'][i].should.instanceof(Object).and.not.empty().and.have.properties(['CAT_NOMBRE', 'CAT_SLUG'])
          }
        }
        done()
      })
  })
})
