let dbutils = require('../db/dbutils');
let dbconfig = require('../db/dbconfig');

let userdb = {'dbString': dbconfig.path + ':' + dbconfig.port, 'schema':dbconfig.schema, 'table':dbconfig.articletable};
