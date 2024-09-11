const { StatusCode, getBody } = require("../../utils.js");
const http = require("http");

function makeHttpRequest(options, postData) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.write(postData);
        req.end();
    });
}

async function createUser(request, response) {
    try {
        const body = await getBody(request);

        // Log the received body to the console
        console.log("Received body:", body);

        // Prepare the data to send to http://127.0.0.1:4999/userData
        const postData = JSON.stringify(body);

        // Set up the request options
        const options = {
            hostname: '127.0.0.1',  // Use IPv4 address
            port: 4999,
            path: '/userData',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
            },
        };

        // Send the request to http://127.0.0.1:4999/userData
        const result = await makeHttpRequest(options, postData);

        console.log('Response from http://127.0.0.1:4999/userData:', result);

        // Return the response from http://127.0.0.1:4999/userData to the original client
        response.writeHead(StatusCode.OK, {
            "Content-Type": "application/json",
        });
        response.end(result);

    } catch (error) {
        console.error("Can't read body", error);
        response.writeHead(StatusCode.INTERNAL_SERVER_ERROR, {
            "Content-Type": "text/plain",
        });
        response.end("Internal Server Error");
    }
}

module.exports = {
    createUser
};
