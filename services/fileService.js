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
			let date = new Date();
			let fname = file.originalname.split(".");
			let filedir = filePath + path;
			fname = fname[fname.length -1];
			fname = date.getTime() + "." + fname;
			path =  filedir + "/" + fname;
			let dbfile = new File(file.originalname, utils.fileType(file.originalname),path, utils.dateNow(), content);
			console.log(dbfile.toJSON());
			fileDao.addFile(dbfile, function(result){
				if(result.ERROR){
					reject(new Error(result.ERROR));
				}else{
					utils.mkdir(filedir);
					fs.renameSync(tmpPath, path);
					resolve(result);
				}
			});
		});
	},

	getImage: function(name){
		let file = new File(name, '','', '', '');
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
	},

	getFileDescription: function(type){
		let file = new File('', type,'', '', '');
		return new Promise(function(resolve, reject){
			fileDao.getFileByType(file, function(result){
				console.log(result);
				if(result.length === 0 || result.ERROR){
					reject(new Error("Not found"));
				}else{
					resolve(result);
				}
			});
		}).timeout(3000);
	}
}