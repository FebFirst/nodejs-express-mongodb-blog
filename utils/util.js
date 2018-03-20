const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

// const filepath = "upload/";

// function newdir(dir, cb){
// 	fs.exists(dir, function(exists){
// 		if(exists){
// 			return cb(exists);
// 		}else{
// 			fs.mkdirSync(dir, function(err){
// 				cb();
// 			});
// 		}
// 	});
// }

function mkdirsSync(dirname) {
	if (fs.existsSync(dirname)) {
		return true;
	} else {
		if (mkdirsSync(path.dirname(dirname))) {
			fs.mkdirSync(dirname);
			return true;
		}
	}
}

let utils = {
	dateNow: function(){
		let date = new Date();
		let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
		let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		let sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

		let dateStr = date.getFullYear() + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;

		return dateStr;
    },

	dateString: function(){
		let date = new Date();
		let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
		let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

		let dateStr = date.getFullYear() + "/" + month + "/" + day;

		return dateStr;
    },

	mkdir: function(dir){
		return mkdirsSync(dir);
	},

	fileType: function(filename){
		const img = ['bmp', 'tiff', 'gif', 'jpeg', 'jpg', 'png'];
		const mov = ['mp4', 'avi', 'mov', 'wmv', 'mkv', 'flv', 'rmvb'];
		const msc = ['mp3', 'wma', 'ape', 'flac', 'wva'];

		let type = filename.split('.');
		type = type[type.length -1];
		if(img.includes(type)){
			return 'image';
		}else if(mov.includes(type)){
			return 'movie';
		}else if(msc.includes(type)){
			return 'music';
		}else{
			return 'document';
		}
	},

	formatArticle: function(article){
			let pFlag = 0;
			let res = "";
			articleAry = article.split("\n");
			for(art in articleAry){
					res += "<p>" + articleAry[art] + "</p>";
			}

			return res;
			// article = "<p>" + article;
			// article.replace(new RegExp("\n", "g"),"</p><p>");
	},

	authorization: function(req, res, next){
			if(!req.session.user){
				return res.send({"ERROR": "Unauthorized"});
			}
			next();
	},

	encodeTitle: function(title){
			return title.replace(new RegExp(" ", "g"), "-");
	},

	decodeTitle: function(title){
			console.log(title);
			return title.replace(new RegExp("-", "g"), " ");
	},
}


module.exports = utils;