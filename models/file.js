class File{
    constructor(name, path, date, content){
        this.name = name;
        this.path = path;
        this.date = date;
        this.content = content;
    }

    toJSON(){
        return {"name": this.name, "path": this.path, "date": this.date, "content": this.content};
    }
}


module.exports = File;