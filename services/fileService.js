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
			//console.log(dbfile.toJSON());
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
					try{
					let res = fs.readFileSync(result[0].path);
					resolve(res);
					}catch(err){
						reject(err);
					}
				}
			});
		}).timeout(3000);
	},

	getFileDescription: function(type){
		let file = new File('', type,'', '', '');
		return new Promise(function(resolve, reject){
			fileDao.getFileByType(file, function(result){
				//console.log(result);
				if(result.length === 0 || result.ERROR){
					reject(new Error("Not found"));
				}else{
					resolve(result);
				}
			});
		}).timeout(3000);
	},

	selectFileBydate: function(type, date1, date2){
		let file = new File('', type,'', '', '');
		let d1 = date1.replace(new RegExp('-', 'g'), '/');
		let d2 = date2.replace(new RegExp('-', 'g'), '/');
		return new Promise(function(resolve, reject){
			fileDao.getFileByType(file, function(result){
				if(result.ERROR){
					resolve(new Error(result.ERROR));
				}else{
					let fileAry = [];
					let fldt = '';
					for(let i = 0; i < result.length; i ++){
						fldt = utils.dateFromDB(result[i].date);
						if(fldt >= d1 && fldt <= d2){
							fileAry.push(result[i]);
						}
					}
					resolve(fileAry);
				}
			});
		}).timeout(3000);
	}
}