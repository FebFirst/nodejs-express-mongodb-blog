let Article = require('../models/article');
let utils = require('../utils/util');
let articleService = require('../services/articleService');

module.exports = function(app){
    app.get('/article/:url', function(req, res, next){
        let url = req.params.url;
        articleService.getArticle(url).then(function(data){
          res.render('article' , data);
        }).catch(function(err){
          next(err);
          // console.error(err);
          //next(new Error("kkkk"));
        });
      });
    
    app.get('/article/category/:cate', function(req, res, next){
      let category = req.params.cate;
      articleService.getArticleByCate(category).then(function(result){
        res.render('article', result);
      }).catch(function(err){
        next(err);
      });
    });

    
    app.delete('/article/:url', utils.authorization, function(req, res){
        let art = new Article(parseInt(req.params.url), '', '', '','','');
        articleService.deleteArticle(art).then(function(result){
          res.send(result);
        }).catch(function(err){
          next(err);
        });
      });
    
    app.put('/article', utils.authorization, function(req, res){
        let art = new Article(parseInt(req.body.url), req.body.title, req.session.user.username, req.body.category, utils.dateNow(), req.body.content);
        articleService.updateArticle(art).then(function(result){
          res.send(result);
        }).catch(function(err){
          next(err);
        });
      });
    
    app.post('/article', utils.authorization, function(req, res, next){
        let time = new Date();
        let url = time.getTime();
        let art = new Article(url, req.body.title, req.session.user.username, req.body.category, utils.dateNow(), req.body.content);
        articleService.addArticle(art).then(function(result){
          res.send({"redirectUrl":"/article/" + url});
        }).catch(function(){
          next(new Error("Internal Server Error"));
        });
    });


}