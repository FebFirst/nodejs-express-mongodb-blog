let dbutils = require('../db/dbutils');
let dbconfig = require('../db/dbconfig');

let articledb = {'dbString': dbconfig.path + ':' + dbconfig.port, 'schema':dbconfig.schema, 'table':dbconfig.articletable};


let articledao = {
    addArticle: function(article, cb){
        let data = article.toJSON();
        let whereStr = {'title': article.title};
        console.log("1");
        dbutils.get(articledb, whereStr, function(result){
            if(result.length !== 0){
                return cb({'ERROR': 'Title exists'});
            }
            console.log("2");
            dbutils.add(articledb, data, cb);
        });
    },

    deleteArticle: function(article, cb){
        let whereStr = {'title': article.title};
        dbutils.delete(articledb, whereStr, cb);
    },

    updateArticle: function(article, cb){
        let whereStr = {'title': article.title};
        let data = article.toJSON();
        dbutils.update(articledb, whereStr, data, cb);
    },

    getArticle: function(article, cb){
        let whereStr = {'title': article.title};
        dbutils.get(articledb, whereStr, cb);
    },

    getAll: function(cb){
        dbutils.getAll(articledb, function(result){
            cb(result);
        });
    },

    getSpecifyCol: function(whereStr, cb){
        dbutils.getSpecifyCol(articledb, whereStr, function(result){
            cb(result);
        });
    }
}

module.exports = articledao;