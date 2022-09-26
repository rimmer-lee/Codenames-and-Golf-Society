module.exports = async function (hostname, path) {
    if (!hostname) return '';
    const options = {
        hostname,
        port: 443,
        path,
        method: 'GET'
    };
    if (process.env.NODE_ENV !== 'production') {
        const newOptions = [
            { key: 'rejectUnauthorized', value: false },
            { key: 'requestCert', value: true },
            { key: 'agent', value: false }
        ];
        for (const newOption of newOptions) {
            const { key, value } = newOption;
            options[key] = value;
        };
    };
    const https = require('https');
    return new Promise((resolve, reject) => {
        const request = https.request(options, response => {
            let body = '';
            response.setEncoding('utf8');
            response.on('data', chunk => body += chunk);
            response.on('end', () => resolve(body));
            response.on('error', error => {
                throw error
            });
        });
        request.end();
    });
};