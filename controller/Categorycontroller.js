const db = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const allCategory = (req,res) => {
    let {category_id} = req.query;
    
    let sql = "SELECT * FROM books WHERE category_id = ?";
    db.query(sql, [category_id], (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        res.status(StatusCodes.OK).json(results);
       }
    ) 
};

module.exports = {
    allCategory
};