const {Store} = require('../models');

exports.ItemIn = async(req,res)=>{
    try {
        const {name,image,price,amount} = req.body;

        const store = await Store.findOne({
            where : {
                name
            }
        });

        if(store != null){
            return res.send("동일 이름 상품 존재함.");
        }

        await Store.create({
            name,
            image,
            price,
            amount
        })

        res.send()
    } catch (error) {
        console.log('상품 추가하다 에러남');
        console.log(error);
    }
}