const Promise = require('bluebird');
const File = require('../models/file');
const fs = require('fs');
const fileDao = require('../dao/filedao');
const utils = require('../utils/util');

const filePath = "upload/";

module.exports = {
	saveFile: function(file, content){
		let tmpPath = file.path;
		let path = utils.dateString();
		return new Promise(function(resolve, reject){
			utils.mkdir(path).then(function(){
				let date = new Date();
				let fname = file.originalname.split(".");
				fname = fname[fname.length -1];
				fname = date.getTime() + "." + fname;
				path = filePath + path + "/" + fname;
				fs.renameSync(tmpPath, path);
				let dbfile = new File(file.originalname, path, utils.dateNow(), content);
				console.log(dbfile.toJSON());
				fileDao.addFile(dbfile, function(result){
					resolve(result);
				});
			}).catch(function(err){
				reject(err);
			});	
		});
		
	}
}