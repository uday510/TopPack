const searchController = require('../controllers/search.controller');

module.exports = (app) => {

  app.get("/toppost/api/v1/search", searchController.searchRepositories);
  app.get("/toppost/api/v1/searchtop10", searchController.top10Repositories);
  app.get("/toppost/api/v1/searchtop3", searchController.top3Repositories);
}