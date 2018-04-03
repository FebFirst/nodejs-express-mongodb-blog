const Promise = require('bluebird');
const Article = require('../models/article');
const Comment = require('../models/comment');
const articleDao = require('../dao/articledao');
const commentDao = require('../dao/commentdao');
const Utils = require('../utils/util');



module.exports = {
	getArticle: function(url){
		let art = new Article(parseInt(url), '', '', '', '','');
		let cmt = new Comment(url,'','','');
		let filter = {'projection':{author: 0, category: 0, content: 0}, 'sort':{time: -1}, limit: 5};
		return new Promise(async function(resolve, reject){
			try{
				let articles = await articleDao.getArticle(art);
				let comments = await commentDao.getComment(cmt);
				let latestArt = await articleDao.getSpecifyCol({}, filter);
				if(articles.length === 0){
					reject(new Error('Article Not Found'));
				}else{
					let articleData = [];
					articleData.push({title: articles[0].title,time:articles[0].time, url:articles[0].url, content: articles[0].content.split("\n"), 'comments': comments});
					resolve({'data': latestArt, 'articles': articleData});
				}
			}catch(err){
				reject(err);
			}
		}).timeout(6000);
	},

	getArticleByCate: function(cate){
		return new Promise(async function(resolve, reject){
			let filter = {'projection':{author: 0, category: 0, content: 0}, 'sort':{time: -1}, limit: 5};
			try{
				let result = await articleDao.getArticleByCate(cate);
				let latestArt = await articleDao.getSpecifyCol({}, filter);
				if(result.length === 0){
					reject(new Error('No Such Category'));
				}
				let arts = [];
				for(art in result){
					arts.push({title: result[art].title,time:result[art].time, url:result[art].url, content: result[art].content.split("\n")});
				}
				resolve({data: latestArt,articles: arts});
			}catch(err){
				reject(err);
			}
		}).timeout(3000);
	}, 

	getSpecifyCol: function(whereStr, filter){
		return new Promise(function(resolve, reject){
			let latestArt = await articleDao.getSpecifyCol({}, filter);
			if(latestArt.ERROR){
				reject(new Error(latestArt.ERROR));
			}else{
				resolve({data: latestArt, articles: -1});
			}
		});
	},

	addArticle: function(art){
		return new Promise(function(resolve){
			articleDao.addArticle(art, function(result){
				resolve(result);
			});
		}).timeout(3000);
	},

	updateArticle: function(art){
		return new Promise(function(resolve){
			articleDao.updateArticle(art, function(result){
				resolve(result);
			});
		}).timeout(3000);
	},

	deleteArticle: function(art){
		return new Promise(function(resolve){
			articleDao.deleteArticle(art, function(result){
				resolve(result);
			});
		}).timeout(3000);
	}
}

