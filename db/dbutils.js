let client = require('mongodb').MongoClient;
let dbconfig = require('./dbconfig');

let dbString = dbconfig.path + ':' + dbconfig.port;

function addData(db, data, cb)
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


function deleteData(db, data, cb)
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


function updateData(db, whereStr, data, cb)
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


function getData(db, whereStr, cb)
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

function getAll(db, cb)
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


module.exports = {
    add : function(data, cb){
        client.connect(dbString, function(err, db){
            addData(db, data, function(result){
                cb(result);
                db.close();
            });
        });
    },

    delete : function(data, cb){
        client.connect(dbString, function(err, db){
            deleteData(db, data, function(result){
                cb(result);
                db.close();
            });
        });
    },

    update : function(whereStr, data, cb){
        client.connect(dbString, function(err, db){
            updateData(db, whereStr, data, function(result){
                cb(result);
                db.close();
            });
        });
    },

    get : function(whereStr, cb){
        client.connect(dbString, function(err, db){
            getData(db, whereStr, function(result){
                cb(result);
                db.close();
            });
        });
    },

    getAll : function(cb){
        client.connect(dbString, function(err, db){
            getAll(db, function(result){
                cb(result);
                db.close();
            });
        });
    }
}