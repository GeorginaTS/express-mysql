const db = require("../../config/database")

module.exports = class Status {
    constructor( name, color ){
        this.name = name
        this.color = color
    }
    static getAll() {
       return db.execute("SELECT * FROM status")
    }
    static getById(id){
        return db.execute(`SELECT * FROM status WHERE id=${id}`)
    }

}

