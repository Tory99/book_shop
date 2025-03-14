const express = require('express')
const router = express.Router();
const {
    allCategory
} = require('../controller/Categorycontroller');

router.use(express.json());
// 도서 조회 
router.get('/', allCategory);

module.exports = router;