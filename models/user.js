class User
{
    constructor(name, code, email){
        this.username = name;
        this.password = code;
        this.email = email;
    }

    setUsername(name){
        this.username = name;
    }

    setPassword(code){
        this.password = code;
    }

    setEmail(email){
        this.email = email;
    }

    getUsername(){
        return this.username;
    }

    getPassword(){
        return this.password;
    }

    getEmail(){
        return this.email;
    }

    toJSON(){
        return {"username": this.username, "password": this.password,"email": this.email};
    }
}


module.exports = User;
