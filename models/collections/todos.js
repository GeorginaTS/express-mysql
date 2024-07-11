const db = require("../../config/database")

module.exports = class Todo {
    constructor( title, content, status, iduser, idcategory){
        this.title = title,
        this.content = content,
        this.status = status,
        this.iduser = iduser,
        this.idcategory= idcategory
    }
    static getAll() {
       return db.execute("SELECT * FROM todos")
    }
    create() {
        return db.execute(`INSERT INTO todos (title,content, status,iduser, idcategory) VALUES ("${this.title}", "${this.content}", ${this.status}, ${this.iduser}, ${this.idcategory})`)
    }

    static getById(id){
        return db.execute(`SELECT * FROM todos WHERE id=${id}`)
    }
    static delete(id) {
        return db.execute(`DELETE FROM todos WHERE id=${id}`)
    }
    update(id) {
        return db.execute(`UPDATE todos SET title = "${this.title}", content = "${this.content}", status = ${this.status}, iduser = ${this.iduser}, idcategory = ${this.idcategory}
WHERE id=${id}`)
    }
}