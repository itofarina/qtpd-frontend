const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        APIEndpoint: JSON.stringify(process.env.APIEndpoint),
        ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
        googleMapsApiKey: JSON.stringify(process.env.googleMapsApiKey)
      }
    })
  ]
};