class User
{
    constructor(name, code, email, role, lastlogin){
        this.username = name;
        this.password = code;
        this.email = email;
        this.role = role;
        this.lastlogin = lastlogin;
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

    setRole(role){
        this.role = role;
    }

    setLastlogin(lastlogin){
        this.lastlogin = lastlogin;
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

    getRole(){
        return this.role;
    }

    getLastlogin(){
        return this.lastlogin;
    }

    toJSON(){
        return {"username": this.username, "password": this.password,"email": this.email, "role":this.role, "lastlogin": this.lastlogin};
    }
}


module.exports = User;
