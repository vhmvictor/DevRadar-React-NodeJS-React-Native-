const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index); //função para listar devs
routes.post('/devs', DevController.store); //funçãp para criar um dev

routes.get('/search', SearchController.index);

module.exports = routes;