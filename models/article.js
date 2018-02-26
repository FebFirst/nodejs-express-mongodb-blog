class Article
{
    constructor(title, author, category, time, content){
        this.title = title;
        this.author = author;
        this.time = time;
        this.content = content;
        this.category = category;
    }

    setTitle(title){
        this.title = title;
    }

    setAuthor(author){
        this.author = author;
    }

    setCategory(category){
        this.category = category;
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

    getCategory(){
        return this.category;
    }

    getTime(){
        return this.time;
    }

    getContent(){
        return this.content;
    }

    toJSON(){
        return {'title': this.title, 'author': this.author, 'category': this.category, 'time': this.time, 'content':this.content};
    }
}

module.exports = Article;