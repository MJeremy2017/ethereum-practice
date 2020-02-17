const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const mocha = require('mocha');






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


