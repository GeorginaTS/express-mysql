require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get("/", (request, response) => {
    response.send("<h1>Hola mundo</h1>") 
});

app.use("/api/todos", require("./routes/todos"))
app.use("/api/users", require("./routes/users"))

app.listen(PORT, () => {
  console.log(`😊 Listening localhost port : ${PORT}`);
});
