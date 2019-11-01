module.exports = function (env) {
  const configLocal = {
    'urlDomain': 'http://evento.cyberlunes.local',
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
      return configDev
    case 'beta':
      return configLocal
    case 'prod':
      return configLocal
    default:
      return configLocal
  }
}
