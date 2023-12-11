const {Store} = require('../models');

exports.ItemOut = async(req,res)=>{
    try {
        const {name} = req.body;

        await Store.destroy({
            where : {
                name
            }
        });

        res.send("물품 제거 완료");
    } catch (error) {
        console.log('상품 제거하다 에러남');
        console.log(error);
    }
}