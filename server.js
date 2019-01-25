const { existsSync, createReadStream } = require('fs'),
    { join } = require('path');

const SERVER_PORT = 88,
    SERVER_DIR = join(__dirname, process.argv[2]),
    SPA_HOME_PAGE = SERVER_DIR + '/index.html';

const ans = (res, url) => {
    console.log(`<-- Found: ${url}\n`);
    createReadStream(url).pipe(res);
};

require('http').createServer((req, res) => {

    const { url } = req;

    console.log(`--> Route: ${url}`);

    if (url.match(/^\/(?:dist|node_modules)\//)) {
        ans(res, __dirname + url);
    } else if (url.match(/^\/\w*$/)) {
        ans(res, SPA_HOME_PAGE);
    } else if (existsSync(SERVER_DIR + url)) {
        ans(res, SERVER_DIR + url);
    } else {
        res.writeHead(404);
        res.end();
        console.log('<-- Not found.\n');
    }

}).listen(SERVER_PORT);

console.log(`Server started on ${SERVER_PORT} in "${SERVER_DIR}".\n`);
