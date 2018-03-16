let session = require('express-session');
const userService = require('../services/userService');
let User = require('../models/user');
let utils = require('../utils/util')


module.exports = function(app){
  app.get('/user/:name', function(req, res, next){
    let name = req.params.name;
    let usr = new User(name,'','','','');
    userService.getUserByName(usr).then(function(result){
      res.send(result);
    }).catch(function(err){
      next(err);
    });
  });

  app.delete('/user/:name', utils.authorization, function(req, res, next){
    userService.deleteUser(usr).then(function(result){
      res.send(result);
    }).catch(function(err){
      next(err);
    });
    
  });

  app.put('/user', utils.authorization, function(req, res, next){
    let usr = new User(req.body.username, req.body.password, req.body.email,"","");
    userService.updateUser(usr).then(function(result){
      res.send({"OK":1});
    }).catch(function(err){
      next(err);
    });
  });

  app.post('/user', utils.authorization, function(req, res, next){
    let usr = new User(req.body.username, req.body.password, req.body.email,"","");
    userService.addUser(usr).then(function(result){
      res.send(result);
    }).catch(function(err){
      next(err);
    });
  });

  app.get('/user', function(req, res, next){
    userService.getAllUsers().then(function(result){
      res.send(result);
    }).catch(function(err){
      next(err);
    });
  });


  app.post('/login', function(req, res, next){
    let usr = new User('', req.body.password, req.body.email,'','');
    userService.getUserByEmail(usr).then(function(usr){
      req.session.user = usr;
      res.cookie('lastlogin', usr.lastlogin);
      res.redirect('/');
    }).catch(function(err){
      next(err);
    });
  });


  app.get('/logout', function(req, res){
    req.session.user = null;
    req.session.error = null;
    res.redirect('/login.html');
  });
};

