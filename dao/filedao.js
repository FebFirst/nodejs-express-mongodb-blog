let dbutils = require('../db/dbutils');
let dbconfig = require('../db/dbconfig');

let filedb = {'dbString': dbconfig.path + ':' + dbconfig.port, 'schema':dbconfig.schema, 'table':dbconfig.filetable};


let fileDao = {
    addFile: function(file, cb){
        let data = file.toJSON();
        let whereStr = {"name": file.name};
        dbutils.get(filedb, whereStr, function(result){
            if(result.length !== 0)
                return cb({"ERROR": "File exists!"});
            dbutils.add(filedb, data, cb);
        });
        
    },

    deleteFile: function(file, cb){
        let whereStr = {"name": file.name};
        dbutils.delete(filedb, whereStr, cb);
    },

    updateFile: function(file, cb){
        let whereStr = {"name": file.name};
        let data = file.toJSON();
        dbutils.update(filedb, whereStr, data, cb);
    },

    getFile: function(file, cb){
        if(!file.name)
            return cb({"ERROR" : "Filename is empty"});
        let whereStr = {"name": file.name};
        dbutils.get(filedb, whereStr, cb);
    },

    getFileByType: function(file, cb){
        if(!file.type)
            return cb({"ERROR" : "File type is empty"});
        let whereStr = {"type": file.type};
        dbutils.get(filedb, whereStr, cb);
    },

    getAllFiles: function(cb){
        dbutils.getAll(filedb, function(result){
            cb(result);
        });
    }
}

module.exports = fileDao;