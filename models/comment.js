class Comment
{
	constructor(article, email, time, content){
		this.article = article;
		this.email = email;
		this.content = content;
		this.time = time;
	}

	toJSON(){
		return {'article': this.article, 'email': this.email, 'time': this.time, 'content': this.content};
	}
}


module.exports = Comment;