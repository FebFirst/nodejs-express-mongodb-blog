let dbutils = require('../db/dbutils');
let dbconfig = require('../db/dbconfig');

let userdb = {'dbString': dbconfig.path + ':' + dbconfig.port, 'schema':dbconfig.schema, 'table':dbconfig.usertable};


let UserDao = {
    addUser: function(user, cb){
        let data = user.toJSON();
        let whereStr = {"email": user.email};
        dbutils.get(userdb, whereStr, function(result){
            if(result.length !== 0)
                return cb({"ERROR": "User exists!"});
            dbutils.add(userdb, data, cb);
        });
        
    },

    deleteUser: function(user, cb){
       // let whereStr = {"email": user.email};
        let whereStr = {"username": user.getUsername()};
        dbutils.delete(userdb, whereStr, cb);
    },

    updateUser: function(user, cb){
        let whereStr = {"email": user.getEmail()};
        let data = user.toJSON();
        dbutils.update(userdb, whereStr, data, cb);
    },

    getUser: function(user, cb){
        if(!user.getUsername())
            return cb({"ERROR" : "Usename is empty"});
        let whereStr = {"username": user.getUsername()};
        dbutils.get(userdb, whereStr, cb);
    },

    getUserByEmail: function(user, cb){
        if(!user.getEmail()){
            return cb({"ERROR" : "Email is empty"});
        }
        let whereStr = {"email": user.getEmail()};
        dbutils.get(userdb, whereStr, cb);
    },

    getAllUsers: function(cb){
        dbutils.getAll(userdb, cb);
    }
}

module.exports = UserDao;