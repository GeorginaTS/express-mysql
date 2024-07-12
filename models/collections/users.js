const db = require("../../config/database")

module.exports = class Todos {
    constructor( name, lastname, email, password, profile){
        this.name = name,
        this.lastname = lastname,
        this.email = email,
        this.password = password,
        this.profile = profile
    }
    static getAll() {
        return db.execute("SELECT * FROM users")
    }
    create() {
        return db.execute(`INSERT INTO users (name, lastname, email, password, profile) VALUES ("${this.name}","${this.lastname}","${this.email}", "${this.password}","${this.profile}" )`)
    }
    static getById(id){
        return db.execute(`SELECT * FROM users WHERE id=${id}`)
    }
    static getByEmail(email){
        return db.execute(`SELECT * FROM users WHERE email="${email}"`)
    }
    static delete(id) {
        return db.execute(`DELETE FROM users WHERE id=${id}`)
    }

    update(id) {
        return db.execute(`UPDATE users SET name="${this.name}",lastname="${this.lastname}",email="${this.email}", password= "${this.password}", profile= "${this.profile}" WHERE id=${id}`)
    }
}