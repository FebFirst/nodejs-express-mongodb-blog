let userdao = require('./userdao');
let User = require('../models/user');

let usr = new User('Masami','cute','mine@leo.com');

// userdao.addUser(usr, function(result){
//     console.log(result);
// });

// userdao.deleteUser(usr, function(result){
//     console.log(result);
// });

// userdao.updateUser(usr, function(result){
//     console.log(result);
// });

userdao.getUser(usr, function(result){
    console.log(JSON.stringify(result));
});
