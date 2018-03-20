const Promise = require('bluebird');
const Article = require('../models/article');
const articleDao = require('../dao/articledao');
const Utils = require('../utils/util');


module.exports = {
	getArticle: function(url){
		let art = new Article(parseInt(url), '', '', '', '','');
		return new Promise(function(resolve, reject){
			articleDao.getArticle(art, function(result){
				if(result.length === 0){
					reject(new Error('Article Not Found'));
				}else{
					let articleData = [];
					articleData.push({title: result[0].title,time:result[0].time, url:result[0].url, content: result[0].content.split("\n")});
					let filter = {'projection':{author: 0, category: 0, content: 0}, 'sort':{time: -1}, limit: 5};
					articleDao.getSpecifyCol({}, filter, function(resl){
						resolve({data: resl, articles: articleData});
					});
				}
		});
		}).timeout(3000);
	},

	getArticleByCate: function(cate){
		return new Promise(function(resolve, reject){
			let filter = {'projection':{author: 0, category: 0, content: 0}, 'sort':{time: -1}, limit: 5};
			articleDao.getArticleByCate(cate, function(result){
				if(result.length === 0){
					reject(new Error('No Such Category'));
				}else{
					let arts = [];
					for(art in result){
						arts.push({title: result[art].title,time:result[art].time, url:result[art].url, content: result[art].content.split("\n")});
					}
					articleDao.getSpecifyCol({}, filter, function(resl){
						resolve({data: resl,articles: arts});
					});
				}
			});
		}).timeout(3000);
	}, 

	getSpecifyCol: function(whereStr, filter){
		return new Promise(function(resolve, reject){
			articleDao.getSpecifyCol({}, filter, function(resl){
				if(resl.ERROR){
					reject(new Error(resl.ERROR));
				}else{
					resolve({data: resl,articles: - 1});
				}
			});
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

