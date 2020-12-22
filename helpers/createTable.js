const ydb = require('./ydb')

new Promise(async (resolve) => {
    await ydb.query('CreateTable', {
            TableName: 'll-auth/keys',
            AttributeDefinitions: [
                {AttributeName: "id", AttributeType: "N"},
                {AttributeName: "privateKey", AttributeType: "S"},
                {AttributeName: "publicKey", AttributeType: "S"},
                {AttributeName: "expireAt", AttributeType: "N"},
            ],
            KeySchema: [
                {AttributeName: 'id', KeyType: "HASH"}
            ]
        }
    ).then(console.log);
});

// new Promise(async (resolve) => {
//     await ydb.query('CreateTable', {
//             TableName: 'll-auth/users',
//             AttributeDefinitions: [
//                 {AttributeName: "userId", AttributeType: "N"},
//                 {AttributeName: "userName", AttributeType: "S"},
//                 {AttributeName: "passwordHash", AttributeType: "S"},
//             ],
//             KeySchema: [
//                 {AttributeName: 'userId', KeyType: "HASH"}
//             ]
//         }
//     ).then(console.log);
// });
//
