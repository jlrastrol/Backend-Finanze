require("dotenv").config();

const express = require('express'),
    auth = require("./routes/auth"),
    user = require("./routes/user"),
    transaction = require("./routes/transaction"),
    cors = require('cors')

const middleware = require("./middleware/auth");


const app = express();
const connection = require("./db/db");

connection();

app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/user", middleware, user);
app.use("/transactions", middleware, transaction);

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000')
});