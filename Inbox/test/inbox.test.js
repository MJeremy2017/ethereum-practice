const assert = require('assert');
// local test network
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const mocha = require('mocha');
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

mocha.beforeEach(async () => {
    // get list of accounts
    accounts = await web3.eth.getAccounts();
    // deploy a contract to an account
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hello']})
        .send({from: accounts[0], gas: '1000000'});

    inbox.setProvider(provider);
});

mocha.describe('Inbox', () => {
    mocha.it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    mocha.it('has default message', async () => {
        const msg = await inbox.methods.message().call();
        assert.strictEqual(msg, 'Hello')
    });

    mocha.it('can modify message', async () => {
       await inbox.methods.setMessage('Hi').send({from: accounts[0]});
       const msg = await inbox.methods.message().call();
       assert.strictEqual(msg, 'Hi')
    });

});




// class Car {
//     park() {
//         return 'stopped';
//     }
//
//     drive() {
//         return 'vroom';
//     }
// }
//
// let car;
//
// mocha.beforeEach(() => {
//     car = new Car()
// });
//
// mocha.describe('Car', () => {
//     mocha.it('should park', function () {
//         assert.strictEqual(car.park(), 'stopped');
//     });
//
//     mocha.it('should drive', function () {
//         assert.strictEqual(car.drive(), 'vroom');
//     });
// });


