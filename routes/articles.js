let Article = require('../models/article');
let articleDao = require('../dao/articledao');
let utils = require('../utils/util');
let articleService = require('../services/articleService');

module.exports = function(app){
    app.get('/article/:url', function(req, res, next){
        // let art = new Article(parseInt(req.params.url), '', '', '', '','');
        // articleDao.getArticle(art, function(result){
        //   if(result.length === 0){
        //     return res.redirect("/");
        //   }
        //   let articleData = {title: result[0].title, content: result[0].content.split("\n")};
        //   //console.log(articleData);
        //   articleDao.getSpecifyCol({'projection':{author: 0, category: 0, content: 0}, 'sort':{time: -1}, limit: 5}, function(resl){
        //     //console.log("wtf");
        //     return res.render('article',{data: resl, specifyArticle: articleData});
        //   });
        //   //res.render("artlcle", {specifyArticle: articleData});
        // });
        let url = req.params.url;
        articleService.getArticle(url).then(function(data){
          res.render('article' , data);
        }).catch(function(err){
          next(err);
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