// server.js

// BASE SETUP
// =============================================================================

// load config
var config = require('../config/config');

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DATABASE CONNECTION
// =============================================================================
mongoose.connect(config.api.database);

// ENABLE CORS
// =============================================================================
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// LOAD CONTROLLERS
var domain = require('./controllers/domain');
var profile = require('./controllers/profile');
var feeds = require('./controllers/feeds');
var fotos = require('./controllers/fotos');
var videos = require('./controllers/videos');

// REGISTER OUR ROUTES -------------------------------
router.get('/api/domain/:name', domain.getDomain);
router.get('/api/:fansite/profile', profile.getProfile);
router.get('/api/:fansite/feeds/:direction?/:index?', feeds.getFeeds);
router.get('/api/:fansite/fotos/:direction?/:index?', fotos.getFotos);
router.get('/api/:fansite/videos/:direction?/:index?', videos.getVideos);

// START THE SERVER
// =============================================================================
app.use(router);
app.listen(config.api.port);
console.log('API listening on port ' + config.api.port);