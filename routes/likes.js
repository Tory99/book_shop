const express = require('express')
const router = express.Router();

router.use(express.json());

// 좋아요 추가 
router.post('/:Id',[

],(req,res)=> {
    res.json('좋아요 추가');
})

// 좋아요 삭제 
router.delete('/:Id',[

],(req,res)=> {
    res.json('좋아요 삭제');
})


module.exports = router;