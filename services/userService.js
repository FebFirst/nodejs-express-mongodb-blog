const Promise = require('bluebird');
const User = require('../models/user');
const userDao = require('../dao/userdao');
const Utils = require('../utils/util');


module.exports = {
	getUserByEmail: function(usr){
		return new Promise(function(resolve, reject){
			userDao.getUserByEmail(usr, function(result){
				if(result.length === 0){
					reject(new Error("Wrong username or password"));
				}else{
					if(result[0].password !== usr.password){
						reject(new Error("Wrong username or password"));
					}else{
						let date = Date().toString();
        		usr = new User(result.username, result.password, result.email, result.role, date);
        		userDao.updateUser(usr, function(result){
						});
						usr = result[0];
						usr.lastlogin = date;
						resolve(usr);
					}
				}
			});
		}).timeout(3000);
	},

	deleteUser: function(usr){
		return new Promise(function(resolve, reject){
			userDao.getUserByEmail(user, function(result){
				result = result[0];
				if(result.lastlogin === req.cookie["lastlogin"]){
					let name = req.params.name;
					usr = new User(name,'','','','');
					//console.log(usr.toJSON());
					userDao.deleteUser(usr, function(result){
					 // console.log(result);
						resolve(result);
					});
				}else{
					reject(new Error("Internal server error"));
				}
			});
		}).timeout(3000);
	}
}
