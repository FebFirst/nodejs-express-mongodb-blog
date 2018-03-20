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
			if(utils.mkdir(path)){
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
			}else{
				reject(err);
			}	
		});
	},

	getFile: function(name){
		let file = new File(name, '', '', '');
		return new Promise(function(resolve, reject){
			fileDao.getFile(file, function(result){
				if(result.length === 0){
					reject(new Error("Not found"));
				}else{
					let res = fs.readFileSync(result[0].path);
					resolve(res);
				}
			});
		}).timeout(3000);
	}
}