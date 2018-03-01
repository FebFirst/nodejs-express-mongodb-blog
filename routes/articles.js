let express = require('express');
let Article = require('../models/article');
let articleDao = require('../dao/articledao');
let utils = require('../utils/util');

module.exports = function(app){
    app.get('/article/:title', function(req, res){
        let art = new Article(req.params.title, '', '', '');
        articleDao.getArticle(art, function(result){
          let articleData = {title: result[0].title, content: result[0].content.split("\n")};
          console.log(articleData);
          articleDao.getSpecifyCol({'projection':{author: 0, category: 0, content: 0}, 'sort':{time: -1}, limit: 5}, function(resl){
            return res.render('article',{data: resl, specifyArticle: articleData});
          });
          //res.render("artlcle", {specifyArticle: articleData});
        });
      });
    
    app.delete('/article/:title', function(req, res){
        let art = new Article(req.params.title, '', '', '');
        articleDao.deleteArticle(art, function(result){
          console.log(result);
          res.send(result);
        });
      });
    
    app.put('/article', function(req, res){
        let art = new Article(req.body.title, req.body.author, req.body.category, utils.dateNow(), req.body.content);
        articleDao.updateArticle(art, function(result){
            console.log(result);
            res.send(result);
        });
      });
    
    app.post('/article', function(req, res){
        let time = new Date();
        let art = new Article(req.body.title, req.body.author, req.body.category, utils.dateNow(), req.body.content);
        console.log(art.toJSON());
        articleDao.addArticle(art, function(result){
            console.log(result);
            res.send(result);
        });
    });
}