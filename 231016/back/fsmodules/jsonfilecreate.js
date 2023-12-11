const fs = require('fs');

exports.JsonCreate = async(req,res)=>{
    try {
        const {name,descript,imgURL} = req.body.data;
        console.log(req.body)

        const fileData = `{
            "name" : "${name}",
            "description" : "${descript}",
            "image" : "${imgURL}",
            "attributes" : []
        }`;

        const fileName = `../test/src/NFTjson/${name}.json`;

        await fs.writeFile(fileName,fileData,"utf-8",(err)=>{
            if(err) throw err;
        });

        res.send();
    } catch (error) {
        console.log('json 파일 생성하다 에러남');
        console.log(error);
    }
}