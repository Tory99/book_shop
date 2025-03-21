const db = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const addTOcart = (req,res) => {
    const {book_id,quantity,user_id} = req.body;
    
    let sql = "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?,?,?)";
    let values = [book_id, quantity, user_id]
    db.query(sql, values, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        res.status(StatusCodes.OK).json(results);
       }
    ) 
};

const getCartItems = (req,res) => {
    const {user_id, selected} = req.body;
    
    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                FROM cartItems LEFT JOIN books 
                ON cartItems.book_id = books.id
                WHERE user_id = ? 
                AND cartItems.id IN (?);`;
    db.query(sql, [user_id, selected], (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        res.status(StatusCodes.OK).json(results);
       }
    ) 
};
const removeCartItem = (req,res)=> {
    const {id} = req.params;
    
    let sql = "DELETE FROM cartItems WHERE id = ?;";
    db.query(sql, id, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        res.status(StatusCodes.OK).json(results);
       }
    )
};


module.exports = {
   addTOcart, getCartItems, removeCartItem
};