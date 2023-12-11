const {Store} = require('../models');

exports.StoreList = async(req,res)=>{
    try {
        const store = await Store.findAll();

        res.send(store);
    } catch (error) {
        console.log('상품 리스트 보여주다 에러남');
        console.log(error);
    }
}