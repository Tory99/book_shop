const express = require('express');

require('dotenv').config();
const db = require('./mariadb');

const app = express();
app.use(express.json());

const userRouter = require('./routes/users')
const bookRouter = require('./routes/books')
const likeRouter = require('./routes/likes')
const cartRouter = require('./routes/carts')
const orderRouter = require('./routes/orders')

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/likes", likeRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);



app.listen(process.env.PORT);