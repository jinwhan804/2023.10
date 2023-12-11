const config = {
    dev : {
        username : process.env.USERNAME,
        password : process.env.PASSWORD,
        database : process.env.NAME,
        host : process.env.HOST,
        dialect : "mysql"
    }
}

module.exports = config;