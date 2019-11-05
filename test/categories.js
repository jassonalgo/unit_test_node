
var supertest = require('supertest')
var should = require('should')
var http = require('should-http')
var ConfigTest = require('../config')
const config = new ConfigTest(process.env.NODE_ENV)

var server = supertest.agent(config.urlDomain)

// UNIT test begin

describe('Pruebas unitarias para categorias', function () {
  // prueba de servicio exitosa
  it(config.copys.testing.success, function (done) {
    server
      .get(config.services.endpoint.categories)
      .set('Content-type', config.header)
      .set('X-api-key', config.xApi)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        // codigo de respuesta http
        res.should.have.status(config.services.codes.success)
        // se valida cabezera de json api
        res.should.have.contentType(config.header)

        // se valida mensaje
        res.body.message.should.equal(config.services.messages.success)

        // se valida que vengan el objeto data, sea un array y tenga un minimo de propiedades
        res.body.should.have.properties('data').and.instanceof(Object)
        res.body.data.should.instanceof(Object)
        // se validan campos necesarios minimos
        res.body.should.have.properties(config.services.structure)
        // se valida que el campo errors este vacio
        res.body.errors.should.be.empty()
        // se valida estado en respuesta
        res.body.status.should.equal(config.services.status.success)
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
  // prueba al no enviar cabezera de  json api en request
  it(config.copys.testing.missingJsonHeader, function (done) {
    server
      .get(config.services.endpoint.categories)
      // .set('Content-type', config.header)
      .set('X-api-key', config.xApi)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        // codigo de respuesta http
        res.should.have.status(config.services.codes.badRequest)
        // se valida cabezera de json api
        res.should.have.contentType(config.header)

        // se valida mensaje
        res.body.message.should.equal(config.services.messages.missingJsonHeader)

        // se valida que vengan el objeto data, y este vacio
        res.body.should.have.properties('data')
        res.body.data.should.be.empty()
        // se validan campos necesarios minimos
        res.body.should.have.properties(config.services.structure)
        // se valida que el campo errors sea un array
        res.body.errors.should.instanceof(Object)
        // se valida estado en respuesta
        res.body.status.should.equal(config.services.status.error)
        // se valida que el objeto error tenga el atributo code
        res.body.errors.should.have.properties(['code'])
        // se valida valor de codigo de error
        res.body.errors.should.have.properties(config.services.codes.badRequest)

        done()
      })
  })

  // prueba al no enviar x api key
  it(config.copys.testing.missingXApiKey, function (done) {
    server
      .get(config.services.endpoint.categories)
      .set('Content-type', config.header)
      // .set('X-api-key', config.xApi)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        // codigo de respuesta http
        res.should.have.status(config.services.codes.unAuthorized)
        // se valida cabezera de json api
        res.should.have.contentType(config.header)

        // se valida mensaje
        res.body.message.should.equal(config.services.messages.missingXApiKey)

        // se valida que vengan el objeto data, y este vacio
        res.body.should.have.properties('data')
        res.body.data.should.be.empty()
        // se validan campos necesarios minimos
        res.body.should.have.properties(config.services.structure)
        // se valida que el campo errors sea un array
        res.body.errors.should.instanceof(Object)
        // se valida estado en respuesta
        res.body.status.should.equal(config.services.status.error)
        // se valida que el objeto error tenga el atributo code
        res.body.errors.should.have.properties(['code'])
        // se valida valor de codigo de error
        res.body.errors.should.have.properties(config.services.codes.unAuthorized)

        done()
      })
  })

  // prueba al no enviar x api key
  it(config.copys.testing.badXApiKey, function (done) {
    server
      .get(config.services.endpoint.categories)
      .set('Content-type', config.header)
      .set('X-api-key', config.badXApi)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        // codigo de respuesta http
        res.should.have.status(config.services.codes.unAuthorized)
        // se valida cabezera de json api
        res.should.have.contentType(config.header)

        // se valida mensaje
        res.body.message.should.equal(config.services.messages.missingXApiKey)

        // se valida que vengan el objeto data, y este vacio
        res.body.should.have.properties('data')
        res.body.data.should.be.empty()
        // se validan campos necesarios minimos
        res.body.should.have.properties(config.services.structure)
        // se valida que el campo errors sea un array
        res.body.errors.should.instanceof(Object)
        // se valida estado en respuesta
        res.body.status.should.equal(config.services.status.error)
        // se valida que el objeto error tenga el atributo code
        res.body.errors.should.have.properties(['code'])
        // se valida valor de codigo de error
        res.body.errors.should.have.properties(config.services.codes.unAuthorized)

        done()
      })
  })

  // prueba al consultar servicio por post
  it(config.copys.testing.badServicesPost, function (done) {
    server
      .post(config.services.endpoint.categories)
      .set('Content-type', config.header)
      .set('X-api-key', config.xApi)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        // codigo de respuesta http
        res.should.have.status(config.services.codes.methodNotAllowed)
        // se valida cabezera de json api
        res.should.have.contentType(config.header)

        // se valida mensaje
        res.body.message.should.equal(config.services.messages.methodNotAllowed)

        // se valida que vengan el objeto data, y este vacio
        res.body.should.have.properties('data')
        res.body.data.should.be.empty()
        // se validan campos necesarios minimos
        res.body.should.have.properties(config.services.structure)
        // se valida que el campo errors sea un array
        res.body.errors.should.instanceof(Object)
        // se valida estado en respuesta
        res.body.status.should.equal(config.services.status.error)
        // se valida que el objeto error tenga el atributo code
        res.body.errors.should.have.properties(['code'])
        // se valida valor de codigo de error
        res.body.errors.should.have.properties(config.services.codes.methodNotAllowed)

        done()
      })
  })
})
