const YandexDB = require('./index.js')

new Promise(async (resolve) => {
    const ydb = new YandexDB({
        endpoint: 'https://docapi.serverless.yandexcloud.net/ru-central1/b1glho6pdsm66b2a60a2/etn03f72tb81nr1og6hr',
        keyId: '',
        secretKey: '',
    });

    await ydb.query('CreateTable', {
            TableName: 'll-auth/users',
            AttributeDefinitions: [
                {AttributeName: "userId", AttributeType: "N"},
                {AttributeName: "userName", AttributeType: "S"},
                {AttributeName: "passwordHash", AttributeType: "S"},
            ],
            KeySchema: [
                {AttributeName: 'userId', KeyType: "HASH"}
            ]
        }
    ).then(console.log);
});

