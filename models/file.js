class File{
    constructor(name, type, path, date, content){
        this.name = name;
        this.type = type;
        this.path = path;
        this.date = date;
        this.content = content;
    }

    toJSON(){
        return {"name": this.name, "type": this.type, "path": this.path, "date": this.date};
    }
}


module.exports = File;