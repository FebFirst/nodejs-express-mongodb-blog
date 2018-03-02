let express = require('express');
let Article = require('../models/article');
let articleDao = require('../dao/articledao');
let utils = require('../utils/util');

module.exports = function(app){
    app.get('/article/:url', function(req, res){
        let art = new Article(parseInt(req.params.url), '', '', '', '','');
        articleDao.getArticle(art, function(result){
          if(result.length === 0){
            return res.redirect("/");
          }
          let articleData = {title: result[0].title, content: result[0].content.split("\n")};
          console.log(articleData);
          articleDao.getSpecifyCol({'projection':{author: 0, category: 0, content: 0}, 'sort':{time: -1}, limit: 5}, function(resl){
            return res.render('article',{data: resl, specifyArticle: articleData});
          });
          //res.render("artlcle", {specifyArticle: articleData});
        });
      });
    
    app.delete('/article/:url', utils.authorization, function(req, res){
        let art = new Article(parseInt(req.params.url), '', '', '','','');
        articleDao.deleteArticle(art, function(result){
          console.log(result);
          res.send(result);
        });
      });
    
    app.put('/article', utils.authorization, function(req, res){
        let art = new Article(parseInt(req.body.url), req.body.title, req.session.user.username, req.body.category, utils.dateNow(), req.body.content);
        articleDao.updateArticle(art, function(result){
            console.log(result);
            res.send(result);
        });
      });
    
    app.post('/article', utils.authorization, function(req, res){
        let time = new Date();
        let url = time.getTime();
        let art = new Article(url, req.body.title, req.session.user.username, req.body.category, utils.dateNow(), req.body.content);
        console.log(art.toJSON());
        articleDao.addArticle(art, function(result){
            console.log(result);
            res.redirect('/article/' + url);
            //res.send(result);
        });
    });
}