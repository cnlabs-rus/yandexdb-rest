jest.setTimeout(30000);
const YandexDB = require('./index');

describe('main', function () {
    const ydb = new YandexDB({
        endpoint: 'https://docapi.serverless.yandexcloud.net/ru-central1/b1glho6pdsm66b2a60a2/etn03sltk0n1463u0b16',
        keyId: 'oDWgKxttn5gLd3iBIYH7',
        secretKey: '-1uidzTAZaWur-KDEIn_BZh5dpgiUWRBZGZjFl9P',
    });
    it('test auth', async () => {
        let prefix = `${process.env.CI_PROJECT_NAME || process.env.USER}/${new Date().toISOString().replace(/[:.]/g, '-')}`;
        const {TableDescription} = await ydb.query('CreateTable', {
            TableName: prefix + '/TEST', AttributeDefinitions: [{AttributeName: "id", AttributeType: "N"}],
            KeySchema: [{AttributeName: 'id', KeyType: "HASH"}]
        });
        await ydb.query('DeleteTable', {TableName: TableDescription.TableName})
    });

    it('error handling', async () => {
        try {
            await ydb.query('DeleteTable', {TableName: "not_esiting"})
            expect(true).toBeFalsy();
        } catch (e) {
        }
    });
});
