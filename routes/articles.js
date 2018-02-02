let express = require('express');
let Article = require('../models/article');
let articleDao = require('../dao/articledao');

module.exports = function(app){
    app.get('/article/:title/:author', function(req, res){
        let art = new Article(req.params.title, req.params.author, '','');
        articleDao.getArticle(art, function(result){
          console.log(result);
          res.send(result);
        });
      });
    
    app.delete('/article/:title/:author', function(req, res){
        let art = new Article(req.params.title, req.params.author, '','');
        articleDao.deleteArticle(art, function(result){
          console.log(result);
          res.send(result);
        });
      });
    
    app.put('/article', function(req, res){
        let art = new Article(req.body.title, req.body.author, req.body.time, req.body.content);
        articleDao.updateArticle(art, function(result){
            console.log(result);
            res.send(result);
        });
      });
    
    app.post('/user', function(req, res){
        let art = new Article(req.body.title, req.body.author, req.body.time, req.body.content);
        articleDao.addArticle(art, function(result){
            console.log(result);
            res.send(result);
        });
    });
}