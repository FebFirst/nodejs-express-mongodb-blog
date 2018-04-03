let dbutils = require('../db/dbutils');
let dbconfig = require('../db/dbconfig');
let Promise = require('bluebird');

let commentdb = {'dbString': dbconfig.path + ':' + dbconfig.port, 'schema':dbconfig.schema, 'table':dbconfig.commenttable};


let commentdao = {
  addComment: function(comment, cb){
    let data = comment.toJSON();
    let whereStr = {'article': comment.article};
    dbutils.add(commentdb, data, cb);

  },

  deleteComment: function(comment, cb){
    let whereStr = {'article': comment.article};
    dbutils.delete(commentdb, whereStr, cb);
  },

  updateComment: function(comment, cb){
    let whereStr = {'article': comment.article};
    let data = comment.toJSON();
    dbutils.update(commentdb, whereStr, data, cb);
  },

  getComment: function(comment){
    let whereStr = {'article': comment.article};
    return new Promise(function(resolve, reject){
      dbutils.get(commentdb, whereStr, function(result){
        resolve(result);
      });
    }).timeout(3000);
  },

  // getCommentByCate : function(category, cb){
  //   let whereStr = {'category': category};
  //   dbutils.get(commentdb, whereStr, cb);
  // },

  getAll: function(cb){
    dbutils.getAll(commentdb, function(result){
        cb(result);
    });
  },

  // getSpecifyCol: function(whereStr, colStr, cb){
  //   dbutils.getSpecifyCol(commentdb, whereStr, colStr, function(result){
  //     cb(result);
  //   });
  // }
}

module.exports = commentdao;