// const db = require('../mariadb');
const mariadb = require('mysql2/promise');
const {StatusCodes} = require('http-status-codes');
const ensureAuthorization = require('../auth');

const order = async (req,res) => {
    const db = await mariadb.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            dateStrings : true
    })

    let authorization = ensureAuthorization(req,res);
    
        if (authorization instanceof jwt.TokenExpiredError){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
            });
        } else if ( authorization instanceof jwt.JsonWebTokenError){
            return res.status(StatusCodes.BAD_REQUEST).json({
                "message" : "잘못된 토큰입니다."
            });
        } else {
            const {items, delivery, totalQuantity, totalPrice, firstbooktitle} = req.body;

            let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?,?,?);`;
            let values = [delivery.address,delivery.receiver, delivery.contact];
            let [results] = await db.execute(sql, values); 
            const delivery_id = results.insertId;


            [results] = [];
            sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
                    VALUES (?, ?, ?, ?, ?);`
            values = [ firstbooktitle, totalQuantity, totalPrice, authorization.id, delivery_id];

            [results] = await db.execute(sql, values);
            let order_id = results.insertId;


            sql = `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`;
            let [orderItems, data] = await db.query(sql, [items]);


            sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?;`;
            values = [];

            orderItems.forEach((item) => {
                values.push([order_id, item.book_id, item.quantity]);
            });
            console.log("41번 : ",values);
            results = await db.query(sql, [values]);
            
            let result = await deleteCartItems(db, items);

            return res.status(StatusCodes.OK).json(results[0]);
        }

    
};

const deleteCartItems = async (db, items) => {
    let sql = `DELETE FROM cartItems WHERE id IN (?);`

    let result = await db.query(sql, [items]);
    return result;
};

const getOrders = async (req,res) => {
    const db = await mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        dateStrings : true
    })

    let sql = `SELECT orders.id, created_at, address, receiver, contact, book_title, total_quantity, total_price
                FROM orders LEFT JOIN delivery 
                ON orders.delivery_id = delivery_id;`;
    let [rows, fields ] = await db.query(sql);
    return res.status(StatusCodes.OK).json(rows);

};

const getOrderDetail = async (req,res)=> {
    let authorization = ensureAuthorization(req,res);
    
    if (authorization instanceof jwt.TokenExpiredError){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        });
    } else if ( authorization instanceof jwt.JsonWebTokenError){
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    } else {
        const order_id = req.params.id;

        const db = await mariadb.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            dateStrings : true
        })

        let sql = `SELECT book_id, title, author, price, quantity 
                    FROM orderedBook LEFT JOIN books 
                    ON orderedBook.book_id = books.id
                    WHERE order_id = ?;`;

        let [rows, fields] = await db.query(sql, order_id);
        return res.status(StatusCodes.OK).json(rows);
    }
};



module.exports = {
    order, getOrderDetail, getOrders
};