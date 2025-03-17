const express = require('express')
const router = express.Router();
const {addTOcart, getCartItems, removeCartItem} = require('../controller/Cartcontroller');

router.use(express.json());

// 장바구니 담기
router.post('/',addTOcart);

// 장바구니 조회
router.get('/',getCartItems);

// 장바구니 삭제 
router.delete('/:id',removeCartItem);

//  장바구니에서 선택한 주문 예상 상품 목록 조회회
router.get('/carts/:id',[

],(req,res)=> {
    res.json('장바구니에서 선택한 주문 예상 상품 목록 조회회 ');
});

module.exports = router;