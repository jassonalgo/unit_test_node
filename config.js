module.exports = function (env) {
  const configLocal = {
    'urlDomain': 'http://evento.cyberlunes.local',
    'pathServices': '/services',
    'xApi': 'hello-world',
    'badXApi': 'new-hello-world',
    'header': 'application/vnd.api+json',
    'services': {
      'structure': ['data', 'errors', 'status', 'message'],
      'status': {
        'success': 'Success',
        'error': 'Error',
        'fail': 'Fail'
      },
      'codes': {
        'success': 200,
        'noContent': 204,
        'badRequest': 400,
        'unAuthorized': 401,
        'error': 404,
        'methodNotAllowed': 405
      },
      'messages': {
        'success': 'Succesful result',
        'noContent': 'Succesful result whit empty data',
        'badRequest': 'the request is not valid',
        'missingXApiKey': 'Missing or bad api key',
        'badXApiKey': 'Missing or bad api key',
        'error': 'Unexpected error',
        'methodNotAllowed': 'Methos not allowed',
        'missingJsonHeader': 'Missing header api json'
      },
      'endpoint': {
        'categories': '/evento/travelsale/services/categories'
      }
    },
    'copys': {
      'testing': {
        'success': 'Respuesta exitosa',
        'missingJsonHeader': 'Falla al no enviar cabezera json api',
        'missingXApiKey': 'Falla al no enviar x api key',
        'badXApiKey': 'Falla al no enviar x api key valida',
        'badServicesPost': 'Falla el servicio al enviar pór post'
      }

    }
  }
  const configDev = {
    'urlDomain': 'http://eltiempo.com',
    'pathServices': '/services',
    'xApi': 'hello-world',
    'header': 'application/vnd.api+json',
    'services': {
      'categories': {
        'path': '/evento/travelsale/services/categories',
        'verbose': 'GET',
        'message': 'Succesful result'
      }
    }
  }
  switch (env) {
    case 'test':
      return configLocal
    case 'local':
      return configLocal
    case 'dev':
      return configLocal
    case 'beta':
      return configLocal
    case 'prod':
      return configLocal
    default:
      return configLocal
  }
}
