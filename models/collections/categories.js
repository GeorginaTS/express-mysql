const db = require("../../config/database")

module.exports = class Category {
    constructor( name ){
        this.name = name
    }
    static getAll() {
       return db.execute("SELECT * FROM category")
    }
    create() {
        return db.execute(`INSERT INTO category (name) VALUES ("${this.name}"`)
    }

    static getById(id){
        return db.execute(`SELECT * FROM category WHERE id=${id}`)
    }
    static delete(id) {
        return db.execute(`DELETE FROM category WHERE id=${id}`)
    }
    update(id) {
        return db.execute(`UPDATE category SET name = "${this.name}" WHERE id=${id}`)
    }
}

