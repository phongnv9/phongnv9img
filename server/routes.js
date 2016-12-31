var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home'),
    image = require('../controllers/image'),
    request = require('request'),
    _ = require('underscore');
module.exports = function(app){
  router.get('/', home.index);
  router.get('/images/:image_id', image.index);
  router.post('/images', image.create);
  router.post('/images/:image_id/like', image.like);
  router.post('/images/:image_id/comment', image.comment);
  router.delete('/images/:image_id', image.remove);
  router.get('/exapi', function(req, res){
    console.log('exapi');
    request({
      method: 'GET',
      uri : 'http://localhost:3500/'
    }, function(error, response, body){
      console.log('exapi_1');
      if(error){throw error;}
      var movies = [];
      _.each(JSON.parse(body), function(elem, index){
        movies.push({
          Title : elem.Title,
          Rating : elem.Rating
        });
      });
      res.json(_.sortBy(movies, 'Rating').reverse());
    });
  });

  app.use(router);
}
