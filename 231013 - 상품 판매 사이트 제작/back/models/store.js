const Sequelize = require('sequelize');

class Store extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name :{
                type : Sequelize.STRING(256),
                allowNull : false
            },
            image : {
                type : Sequelize.STRING(256),
                allowNull : false
            },
            price : {
                type : Sequelize.INTEGER,
                allowNull : false
            },
            amount : {
                type : Sequelize.INTEGER,
                defaultValue : 0
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : "Store",
            tableName : "stores",
            paranoid : false,
            charset : "utf8",
            collate : "utf8_general_ci"
        })
    }
}

module.exports = Store;