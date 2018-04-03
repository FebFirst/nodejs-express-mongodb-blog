const Promise = require('bluebird');
const Comment = require('../models/comment');
const commentDao = require('../dao/commentdao');
const utils = require('../utils/util');


module.exports = {
	getComment: function(articleId){
		let comment = new Comment(articleId, '', '');
		return new Promise(function(resolve){
			commentDao.getComment(comment, function(result){
				resolve(result);
			});
		}).timeout(3000);
	},

	addComment: function(articleId, email, content){
		let comment = new Comment(articleId, email, utils.dateNow(), content);
		return new Promise(function(resolve){
			commentDao.addComment(comment, function(result){
				resolve(result);
			});
		}).timeout(3000);
	}
}