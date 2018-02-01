let dbutils = require('../db/dbutils');
let dbconfig = require('../db/dbconfig');

let articledb = {'dbString': dbconfig.path + ':' + dbconfig.port, 'schema':dbconfig.schema, 'table':dbconfig.articletable};


let articledao = {
    addArticle: function(article, cb){
        let data = article.toJSON();
        let whereStr = {'title': article.title, 'author': article.author};
        dbutils.get(articledb, whereStr, function(result){
            if(result.length !== 0){
                return cb({'ERROR': 'Title exists'});
            }

            dbutils.add(articledb, data, cb);
        });
    },

    deleteArticle: function(article, cb){
        let whereStr = {'title': article.title, 'author': article.author};
        dbutils.delete(articledb, whereStr, cb);
    },

    updateArticle: function(article, cb){
        let whereStr = {'title': article.title, 'author': article.author};
        let data = article.toJSON();
        dbutils.update(articledb, whereStr, data, cb);
    },

    getArticle: function(article, cb){
        let whereStr = {'title': article.title, 'author': article.author};
        dbutils.get(articledb, whereStr, cb);
    }
}