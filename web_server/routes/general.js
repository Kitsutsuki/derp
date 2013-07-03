var db = require('../database/jobManager');

/*
* GET home page.
*/

exports.home = function(req, res) {
    db.start(db.getAll(function(err, data) {
      if(err) { throw err; }
      else {
        console.log('Getting list from db...');
        res.render('job/list', { 
            title: 'Job',
            table: data
        });
        console.log('OK');
      }
      db.mongoose.connection.close(function() {
          console.log('Connection closed');
      });
  }));/*
  res.render('home', {
      title: 'Accueil',
      user: 'user'
  });*/
};

/*
* GET all pages.
*/

exports.general = function(req, res) {
  console.log('Client asked for ' + req.path);
  res.render('404', {
      title: 'Erreur 404'
  });
}

/*
* GET logout page.
*/

exports.logout = function (req, res) {
  delete req.session.user_id;
  res.redirect('/login');
}