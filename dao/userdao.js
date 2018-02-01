let dbutils = require('../db/dbutils');

let UserDao = {
    addUser: function(user, cb){
        let data = {"username": user.getUsername(), "password": user.getPassword(),"email": user.getEmail()};
        let whereStr = {"email": user.email};
        dbutils.get(whereStr, function(result){
            if(result.length !== 0)
                return cb({"ERROR": "User exists!"});
            dbutils.add(data, cb);
        });
        
    },

    deleteUser: function(user, cb){
       // let whereStr = {"email": user.email};
        let whereStr = {"username": user.getUsername()};
        dbutils.delete(whereStr, cb);
    },

    updateUser: function(user, cb){
        let whereStr = {"email": user.getEmail()};
        let data = {"username": user.getUsername(), "password": user.getPassword(),"email": user.getEmail()};
        dbutils.update(whereStr, data, cb);
    },

    getUser: function(user, cb){
        if(!user.getUsername())
            return cb({"ERROR" : "Usename is empty"});
        let whereStr = {"username": user.getUsername()};
        dbutils.get(whereStr, cb);
    },

    getAllUsers: function(cb){
        dbutils.getAll(cb);
    }
}

module.exports = UserDao;