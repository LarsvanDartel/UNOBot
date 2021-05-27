require('dotenv').config();

module.exports = {
    token: process.env.TOKEN,
    mysqluser: process.env.MYSQLUSER,
    mysqlpass: process.env.MYSQLPASS,
    mysqlname: process.env.MYSQLNAME,
};