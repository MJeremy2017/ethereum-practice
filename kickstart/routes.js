const routes = require('next-routes')();

// add routing rule
// for all route of campaigns/* route to show.js
routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show');

module.exports = routes;