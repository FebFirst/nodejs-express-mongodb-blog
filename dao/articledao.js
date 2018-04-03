let dbutils = require('../db/dbutils');
let dbconfig = require('../db/dbconfig');
let Promise = require('bluebird');

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

  getArticle: function(article){
    let whereStr = {'url': article.url};
    return new Promise(function(resolve){
      dbutils.get(articledb, whereStr, function(result){
        resolve(result);
      });
    }).timeout(3000);
    
  },

  getArticleByCate : function(category){
    let whereStr = {'category': category};
    return new Promise(function(resolve){
      dbutils.get(articledb, whereStr,function(result){
        resolve(result);
      });
    })
    
  },

  getAll: function(cb){
    dbutils.getAll(articledb, function(result){
        cb(result);
    });
  },

  getSpecifyCol: function(whereStr, colStr){
    return new Promise(function(resolve){
      dbutils.getSpecifyCol(articledb, whereStr, colStr, function(result){
        resolve(result);
      });
    }).timeout(3000);
    
  }
}

module.exports = articledao;