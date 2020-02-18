const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const mocha = require('mocha');
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

mocha.beforeEach(async () => {
    // get list of accounts
    accounts = await web3.eth.getAccounts();

    // deploy a contract to an account
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hello']})
        .send({from: accounts[0], gas: '1000000'})
});

mocha.describe('Inbox', () => {
    mocha.it('deploy a contract', () => {
        console.log(inbox)
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


