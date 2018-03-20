let client = require('mongodb').MongoClient;
// let dbconfig = require('./dbconfig');

// let dbString = dbconfig.path + ':' + dbconfig.port;

function addData(db, dbconfig, data, cb)
{
    const schema = db.db(dbconfig.schema);
    const col = schema.collection(dbconfig.table);

    col.insert(data, function(err, result){
        if(err){
            return console.error(err);
        }

        cb(result);
    });
}


function deleteData(db, dbconfig, data, cb)
{
    const schema = db.db(dbconfig.schema);
    const col = schema.collection(dbconfig.table);
    col.remove(data, function(err, result){
        
        if(err){
            return console.error(err);
        }

        cb(result);
    });
}


function updateData(db, dbconfig, whereStr, data, cb)
{
    const schema = db.db(dbconfig.schema);
    const col = schema.collection(dbconfig.table);

    col.update(whereStr, data, function(err, result){
        if(err){
            return console.error(err);
        }

        cb(result);
    });
}


function getData(db, dbconfig, whereStr, cb)
{
    const schema = db.db(dbconfig.schema);
    const col = schema.collection(dbconfig.table);

    col.find(whereStr).toArray(function(err, result){
        if(err){
            return console.error(err);
        }

        cb(result);
    });
}

function getAll(db, dbconfig, cb)
{
    const schema = db.db(dbconfig.schema);
    const col = schema.collection(dbconfig.table);

    col.find().toArray(function(err, result){
        if(err){
            return console.error(err);
        }

        cb(result);
    });
}

function getSpecifyCol(db, dbconfig, whereStr, colStr, cb)
{
    const schema = db.db(dbconfig.schema);
    const col = schema.collection(dbconfig.table);
    col.find(whereStr, colStr).toArray(function(err, result){
        if(err){
            return console.error(err);
        }
        cb(result);
    });
}


module.exports = {
    add : function(dbconfig, data, cb){
        client.connect(dbconfig.dbString, function(err, db){
            addData(db, dbconfig, data, function(result){
                cb(result);
                db.close();
            });
        });
    },

    delete : function(dbconfig, data, cb){
        client.connect(dbconfig.dbString, function(err, db){
            deleteData(db, dbconfig, data, function(result){
                cb(result);
                db.close();
            });
        });
    },

    update : function(dbconfig, whereStr, data, cb){
        client.connect(dbconfig.dbString, function(err, db){
            updateData(db, dbconfig, whereStr, data, function(result){
                cb(result);
                db.close();
            });
        });
    },

    get : function(dbconfig, whereStr, cb){
        client.connect(dbconfig.dbString, function(err, db){
            getData(db, dbconfig, whereStr, function(result){
                cb(result);
                db.close();
            });
        });
    },

    getAll : function(dbconfig, cb){
        client.connect(dbconfig.dbString, function(err, db){
            getAll(db, dbconfig, function(result){
                cb(result);
                db.close();
            });
        });
    },

    getSpecifyCol : function(dbconfig, whereStr,colStr,  cb){
        client.connect(dbconfig.dbString, function(err, db){
            getSpecifyCol(db, dbconfig, whereStr,colStr, function(result){
                cb(result);
                db.close();
            });
        });
    }
}