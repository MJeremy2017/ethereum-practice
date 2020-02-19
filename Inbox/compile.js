const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// https://stackoverflow.com/questions/53353167/npm-solc-assertionerror-err-assertion-invalid-callback-specified
// export the compiled module
module.exports = solc.compile(source, 1).contracts[':Inbox'];  // 1 contract

