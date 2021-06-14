const dotenvPlugin = require('cypress-dotenv')

module.exports = (on, config) => {
  if (config.testingType === 'component') {
    require('@cypress/react/plugins/react-scripts')(on, config)
  }

  config = dotenvPlugin(config)

  return config
}
