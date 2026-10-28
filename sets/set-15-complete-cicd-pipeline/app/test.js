// Automated Unit Test Suite for DevOps Sample App
// Performs in-memory unit testing of request handlers (no port binding required)

const assert = require('assert');
const { EventEmitter } = require('events');
const server = require('./server');

console.log('>>> [CI Test] Running automated in-memory unit tests...');

function createMockReq(url, method = 'GET') {
    const req = new EventEmitter();
    req.url = url;
    req.method = method;
    req.headers = { host: 'localhost:3000' };
    return req;
}

function createMockRes() {
    const res = new EventEmitter();
    res.statusCode = 200;
    res.headers = {};
    res.body = '';

    res.writeHead = function(statusCode, headers) {
        res.statusCode = statusCode;
        if (headers) Object.assign(res.headers, headers);
        return res;
    };

    res.end = function(data) {
        if (data) res.body += data;
        res.emit('finish');
    };

    return res;
}

// Test 1: Healthcheck endpoint /health
function testHealthEndpoint() {
    return new Promise((resolve, reject) => {
        const req = createMockReq('/health');
        const res = createMockRes();

        res.on('finish', () => {
            try {
                assert.strictEqual(res.statusCode, 200, 'Health endpoint should return HTTP 200');
                const data = JSON.parse(res.body);
                assert.strictEqual(data.status, 'UP', 'Status should be UP');
                console.log('  ✔ Test 1 Passed: /health endpoint returned HTTP 200 with status "UP"');
                resolve();
            } catch (err) {
                reject(err);
            }
        });

        server.emit('request', req, res);
    });
}

// Test 2: Web application home page /
function testHomePage() {
    return new Promise((resolve, reject) => {
        const req = createMockReq('/');
        const res = createMockRes();

        res.on('finish', () => {
            try {
                assert.strictEqual(res.statusCode, 200, 'Home page should return HTTP 200');
                assert.ok(res.body.includes('Agile & DevOps Lab'), 'Home page should include lab title');
                console.log('  ✔ Test 2 Passed: Home page rendered successfully with valid HTML');
                resolve();
            } catch (err) {
                reject(err);
            }
        });

        server.emit('request', req, res);
    });
}

// Run test suite
async function runTests() {
    try {
        await testHealthEndpoint();
        await testHomePage();
        console.log('>>> [CI Test] ALL 2 TESTS PASSED! Application is verified and ready for deployment.');
        process.exit(0);
    } catch (error) {
        console.error('>>> [CI Test] FAILED:', error.message);
        process.exit(1);
    }
}

runTests();
