module.exports = function(app) {
  let router = app.route('/api');

  require('./timeline')(app);
  require('./toots')(app);
}
