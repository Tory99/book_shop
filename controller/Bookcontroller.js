const db = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const allBooks = (req,res) => {
    let {category_id} = req.query;
    
    if(category_id){
        let sql = "SELECT * FROM books WHERE category_id = ?";
        db.query(sql, [category_id], (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if(result.length){
                return res.status(StatusCodes.OK).json(results);
            } else{
                return res.status(StatusCodes.NOT_FOUND).end()
            }
       }
    )
    } else {
        let sql = "SELECT * FROM books";
        db.query(sql, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
    
                return res.status(StatusCodes.CREATED).json(results);
            }
        )}

    
};

const bookDetail = (req,res) => {
    let {id} = req.params;

    let sql = "SELECT * FROM books WHERE id = ?";
    db.query(sql, [id], (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if(result[0]){
                return res.status(StatusCodes.OK).json(results);
            } else{
                return res.status(StatusCodes.NOT_FOUND).end()
            }
       }
    )
};

const booksByCategory = (req,res) => {
    let {category_id} = req.query;

    let sql = "SELECT * FROM books WHERE category_id = ?";
    db.query(sql, [category_id], (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if(result.length){
                return res.status(StatusCodes.OK).json(results);
            } else{
                return res.status(StatusCodes.NOT_FOUND).end()
            }
       }
    )
};

module.exports = {
    allBooks, bookDetail, booksByCategory
};