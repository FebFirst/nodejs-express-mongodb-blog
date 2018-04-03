let commentService = require('../services/commentService');

module.exports = function(app){
	app.get('/comment/:articleId', function(rea, res, next){
		res.send({});
	});

	app.post('/comment', function(req, res, next){
		commentService.addComment(req.body.articleId, req.body.email, req.body.content).then(function(result){
			res.send({"success": 1});
		}).catch(function(err){
			next(err);
		});
	});
}