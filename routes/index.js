const userService = require('../services/userService');
const articleService = require('../services/articleService');
const fileService = require('../services/fileService');


module.exports = function(app){
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.get('/login.html', function(req, res){
    res.render('login');
  });

  app.get('/write.html', function(req, res){
    if(req.session.user){   
      return res.render('write');
    }
    return res.redirect('login.html');
  });

  app.get('/article.html',  function(req, res, next){
    let filter = {'projection':{author: 0, category: 0, content: 0}, 'sort':{time: -1}, limit: 5};
    articleService.getSpecifyCol({}, filter).then(function(result){
      res.render('article',result);
    }).catch(function(err){
      next(err);
    });
  });

  app.get('/admin.html',  function(req, res, next){
    userService.getAllUsers().then(function(result){
      res.render('admin', {data: result});
    }).catch(function(err){
      next(err);
    });
  });

  app.get('/chat.html', function(req, res){
    res.render('chat');
  });

  app.get('/image.html', function(req, res, next){
    fileService.getFileDescription('image').then(function(result){
      res.render('image', {images: result});
    }).catch(function(err){
      res.render('image', {images: []});
    });
   
  });

  app.get('/upload.html', function(req, res){
    if(req.session.user){   
      return res.render('upload');
    }
    return res.redirect('login.html');
  });
}
