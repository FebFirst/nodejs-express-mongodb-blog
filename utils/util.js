let utils = {
    dateNow: function(){
        let date = new Date();
        let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        let dateStr = date.getFullYear() + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;

        return dateStr;
    },

    formatArticle: function(article){
        let pFlag = 0;
        let res = "";
        articleAry = article.split("\n");
        for(art in articleAry){
            res += "<p>" + articleAry[art] + "</p>";
        }

        return res;
        // article = "<p>" + article;
        // article.replace(new RegExp("\n", "g"),"</p><p>");
    },

    authorization: function(req, res, next){
        if(!req.session.user){
          return res.send({"ERROR": "Unauthorized"});
        }
        next();
    },

    encodeTitle: function(title){
        return title.replace(new RegExp(" ", "g"), "-");
    },

    decodeTitle: function(title){
        console.log(title);
        return title.replace(new RegExp("-", "g"), " ");
    },
}


module.exports = utils;