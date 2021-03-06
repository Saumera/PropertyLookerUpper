const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const zillowConfig = require('./zillow.config.js');
const request = require('request');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8080 : process.env.PORT;
const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('/', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(
      path.join(__dirname, 'dist/index.html'))
    )
    res.end();
  });

  app.get('/api/lookup', function(req, res) {
    const params = '?zws-id=' + zillowConfig.zwsid
      + '&address=' + req.query.address
      + '&citystatezip=' + req.query.citystatezip;
    const url = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm'
      + encodeURIComponent(params);
    request(url, function(error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
    });
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  })
}

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err)
  }
  console.info('==> Listening on port %s. Open up http:localhost:%s/ in your browser.', port, port);
})
