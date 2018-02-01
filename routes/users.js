let express = require('express');
let User = require('../models/user');
let userDao = require('../dao/userdao');


module.exports = function(app){
  app.get('/user/:name', function(req, res){
    let name = req.params.name;
    let usr = new User(name,'','');
    userDao.getUser(usr, function(result){
      console.log(result);
      res.send(result);
    });
  });

  app.delete('/user/:name', function(req, res){
    let name = req.params.name;
    let usr = new User(name,'','');
    userDao.deleteUser(usr, function(result){
      console.log(result);
      res.send(result);
    });
  });

  app.put('/user', function(req, res){
    let usr = new User(req.body.username, req.body.password, req.body.email);
    userDao.updateUser(usr, function(result){
      console.log(result);
      res.send({"OK":1});
    });
  });

  app.post('/user', function(req, res){
    let usr = new User(req.body.username, req.body.password, req.body.email);
    userDao.addUser(usr, function(result){
      console.log(result);
      res.send(result);
    });
  });

  app.get('/user', function(req, res){
    userDao.getAllUsers(function(result){
      console.log(result);
      res.send(result);
    });
  });


};

