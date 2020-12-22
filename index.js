/**
 * @jest-environment node
 */

const axios = require('axios').create();
const {aws4Interceptor} = require("aws4-axios");


module.exports = class {
    constructor(options) {
        this.options = options;
        if (!options.version)
            this.options.version = '20120810';
        if (!options.region) {
            this.options.region = 'us-east-1';
        }
        axios.interceptors.request.use(aws4Interceptor({
            region: this.options.region,
            service: "dynamodb"
        }, {
            accessKeyId: options.keyId,
            secretAccessKey: options.secretKey,
        }));
    }

    async query(target, request) {
        if(this.options.verbose) {
            console.log({target, request});
        }
        return axios.post(this.options.endpoint, request, {
            headers: {'X-Amz-Target': `DynamoDB_${this.options.version}.${target}`},
            validateStatus: (status) => {
                return true
            }
        }).then(async (response) => {
            if(response.status > 299) {
                console.log(response.status, "\n", response.data);
                throw new Error('Error while sending request');
            }
            if(this.options.verbose) {
                console.log(response.status, "\n", response.data);
            }
            return response.data;
        });
    }
}
