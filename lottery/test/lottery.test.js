const assert = require('assert');
// local test network
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const mocha = require('mocha');
const { interface, bytecode } = require('../compile');

let accounts;
let lottery;

mocha.beforeEach(async () => {
    // get list of accounts
    accounts = await web3.eth.getAccounts();
    // deploy a contract to an account
    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: '1000000'});

    lottery.setProvider(provider);
});

mocha.describe( 'Lottery', () => {
    mocha.it('deploy a contract', () => {
       assert.ok(lottery.options.address)
    });

    mocha.it('allow one to enter', async () => {
       await lottery.methods.enter().send(
           {from:  accounts[0], value: web3.utils.toWei('0.1', 'ether')}
       );

       const players = await lottery.methods.getPlayers().call();

       assert.strictEqual(1, players.length);
       assert.strictEqual(accounts[0], players[0]);
    });

    mocha.it('allow multiple to enter', async () => {
        await lottery.methods.enter().send(
            {from:  accounts[0], value: web3.utils.toWei('0.1', 'ether')}
        );

        await lottery.methods.enter().send(
            {from:  accounts[1], value: web3.utils.toWei('0.1', 'ether')}
        );

        const players = await lottery.methods.getPlayers().call();

        assert.strictEqual(2, players.length);
        assert.strictEqual(accounts[0], players[0]);
        assert.strictEqual(accounts[1], players[1]);
    });

    mocha.it('require minimum amount of ether to enter', async () => {
        try {
            await lottery.methods.enter().send(
                {from:  accounts[0], value: 0}
            );
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    mocha.it('only manger can pick a winner', async () => {
       try {
           await lottery.methods.pickWinner().send({from: accounts[1]})
           assert(false)
       } catch (err) {
           // expect to go into an err
           assert(err)
       }
    });

    mocha.it('enter a lottery and pick a winner and send money', async () => {
        await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('2', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({ from: accounts[0] });
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference = finalBalance - initialBalance;

        assert(difference > web3.utils.toWei('1.8', 'ether'));
    }
    );

} );
