class Article
{
    constructor(title, author, time, content){
        this.title = title;
        this.author = author;
        this.time = time;
        this.content = content;
    }

    setTitle(title){
        this.title = title;
    }

    setAuthor(author){
        this.author = author;
    }

    setTime(time){
        this.time = time;
    }

    setContent(content){
        this.content = content;
    }

    getTitle(){
        return this.title;
    }

    getAuthor(){
        return this.author;
    }

    getTime(){
        return this.time;
    }

    getContent(){
        return this.content;
    }

    toJSON(){
        return {'title': this.title, 'author': this.author, 'time': this.time, 'content':this.content};
    }
}

module.exports = Article;