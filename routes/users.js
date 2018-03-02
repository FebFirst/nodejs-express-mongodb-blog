let express = require('express');
let session = require('express-session');
let User = require('../models/user');
let userDao = require('../dao/userdao');
let utils = require('../utils/util')

// function authorization(req, res, next){
//   if(!req.session.user){
//     return res.send({"ERROR": "Unauthorized"});
//   }
//   next();
// }

module.exports = function(app){
  app.get('/user/:name', function(req, res){
    let name = req.params.name;
    let usr = new User(name,'','','','');
    userDao.getUser(usr, function(result){
      console.log(result);
      res.send(result);
    });
  });

  app.delete('/user/:name', utils.authorization, function(req, res){
    let usr = new User('', '',req.session.user.email,'','');
    userDao.getUserByEmail(usr, function(result){
      result = result[0];
      if(result.lastlogin === req.cookie["lastlogin"]){
        let name = req.params.name;
        usr = new User(name,'','','','');
        console.log(usr.toJSON());
        return userDao.deleteUser(usr, function(result){
          console.log(result);
          res.send(result);
        });
      }

      return res.send({"ERROR": "Login expired"});
    });
    
  });

  app.put('/user', utils.authorization, function(req, res){
    let usr = new User(req.body.username, req.body.password, req.body.email,"","");
    userDao.updateUser(usr, function(result){
      console.log(result);
      res.send({"OK":1});
    });
  });

  app.post('/user', utils.authorization, function(req, res){
    let usr = new User(req.body.username, req.body.password, req.body.email,"","");
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


  app.post('/login', function(req, res){
    let usr = new User('', req.body.password, req.body.email,'','');
    userDao.getUserByEmail(usr, function(result){
      result = result[0];
      if(result.password === usr.getPassword()){
        req.session.user = result;
        let date = Date().toString();
        usr = new User(result.username, result.password, result.email, result.role, date);
        userDao.updateUser(usr, function(result){
        });
        res.cookie('lastlogin', date);
        return res.redirect('/');
      }
      res.send({"ERROR" : "Invalid email or password"});
    });
  });


  app.get('/logout', function(req, res){
    req.session.user = null;
    req.session.error = null;
    res.redirect('/login.html');
  });
};

