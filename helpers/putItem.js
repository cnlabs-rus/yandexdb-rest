const md5 = require('md5')
const ydb = require('./ydb')

new Promise(async (resolve) => {
    await ydb.query('PutItem', {
        TableName: 'll-auth/users',
        Item: {"userId": {N: "1"}, "userName": {S: "migger"}, "passwordHash": {S: md5('123456')}},
    }).then(console.log);
});

