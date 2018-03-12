let dbutils = require('../db/dbutils');
let dbconfig = require('../db/dbconfig');

let articledb = {'dbString': dbconfig.path + ':' + dbconfig.port, 'schema':dbconfig.schema, 'table':dbconfig.articletable};


let articledao = {
  addArticle: function(article, cb){
    let data = article.toJSON();
    let whereStr = {'url': article.url};
    dbutils.add(articledb, data, cb);
    // dbutils.get(articledb, whereStr, function(result){
    //     if(result.length !== 0){
    //         return cb({'ERROR': 'Title exists'});
    //     }
    //     dbutils.add(articledb, data, cb);
    // });
  },

  deleteArticle: function(article, cb){
    let whereStr = {'url': article.url};
    dbutils.delete(articledb, whereStr, cb);
  },

  updateArticle: function(article, cb){
    let whereStr = {'url': article.url};
    let data = article.toJSON();
    dbutils.update(articledb, whereStr, data, cb);
  },

  getArticle: function(article, cb){
    let whereStr = {'url': article.url};
    dbutils.get(articledb, whereStr, cb);
  },

  getArticleByCate : function(category, cb){
    let whereStr = {'category': category};
    dbutils.get(articledb, whereStr, cb);
  },

  getAll: function(cb){
    dbutils.getAll(articledb, function(result){
        cb(result);
    });
  },

  getSpecifyCol: function(whereStr, colStr, cb){
    dbutils.getSpecifyCol(articledb, whereStr, colStr, function(result){
      cb(result);
    });
  }
}

module.exports = articledao;