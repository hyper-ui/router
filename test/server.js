const { existsSync, createReadStream } = require('fs');

const PORT = 88;

const ans = (res, url) => {
    console.log(`<-- Found: ${url}`);
    createReadStream(url).pipe(res);
};

require('http').createServer((req, res) => {

    const { url } = req;

    console.log(`--> Route: ${url}`);

    if (url.match(/^\/(?:dist|node_modules)\//)) {
        ans(res, '..' + url);
    } else if (url.match(/^\/\w*$/)) {
        ans(res, 'index.html');
    } else if (existsSync('.' + url)) {
        ans(res, '.' + url);
    } else {
        res.writeHead(404);
        res.end();
        console.log('<-- Not found.');
    }

}).listen(PORT);

console.log(`Server started on ${PORT}.`);
