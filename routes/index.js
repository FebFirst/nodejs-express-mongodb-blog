let express = require('express');
let userDao = require('../dao/userdao');


module.exports = function(app){
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.get('/login.html', function(req, res){
    res.render('login');
  });

  app.get('/write.html', function(req, res){
    res.render('write');
  });

  app.get('/article.html',  function(req, res){
    res.render('article');
  });

  app.get('/admin.html',  function(req, res){
    userDao.getAllUsers(function(result){
      res.render('admin', {user: result});
    });
    
  });
}
