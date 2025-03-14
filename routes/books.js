const express = require('express')
const router = express.Router();
const {
    allBooks, bookDetail, booksByCategory
} = require('../controller/Bookcontroller');

router.use(express.json());


// 카테고리별 도서 조회 
router.get('/',booksByCategory)

// 도서 조회 
router.get('/',allBooks)

// 개별 도서 조회 
router.get('/:id',bookDetail)



module.exports = router;