const assert = require('assert');
// local test network
const ganache = require('ganache-cli');  // ganache local network
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const mocha = require('mocha');
const compiledFactory = require('../ethereum/build/CampaignFactory');
const compiledCampaign = require('../ethereum/build/Campaign');

let accounts;
let factory;
let campaignAddress;
let campaign;

mocha.beforeEach(async () => {
    // get list of accounts
    accounts = await web3.eth.getAccounts();

    // deploy a new contract to an account
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({from: accounts[0], gas: '1000000'});  // accounts[0] deployed the factory

    // set minimum contribute value to 100wei
    await factory.methods.createCampaign('100')
        .send({from: accounts[0], gas: '1000000'});  // accounts[0] created a new campaign

    // call a method that does not modify content of contract (no cost)
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    // to retrieve a deployed contract by address
    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);

    factory.setProvider(provider);
    campaign.setProvider(provider);

});

mocha.describe('Campaign', () => {
    mocha.it('factory and campaign deployed', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    mocha.it('address is manager', async () => {
        // default get method of public variable in the contract
        const manager = await campaign.methods.manager().call();
        console.log(manager);
        assert.strictEqual(manager, accounts[0]);
    });

    mocha.it('donator marked as approver', async () => {
        await campaign.methods.contribute().send({from: accounts[1], value: '200'});
        // map need to input key
        const isApprover = campaign.methods.approvers(accounts[1]).call();
        assert(isApprover);
    });

    mocha.it('require minimum contribution', async () => {
       try {
           await campaign.methods.contribute().send({from: accounts[1], value: '10'});
           // directly go fail if reach this line of code
           assert(false);
       } catch (err) {
           assert.ok(err);  // assert(err)
       }
    });

    mocha.it('allows to create a request', async () => {
       await campaign.methods
           .createRequest('Buy food', '100', accounts[1])
           .send({from: accounts[0], gas: '1000000'});

       const req = await campaign.methods.requests(0).call();
       assert.strictEqual(req.description, 'Buy food');
    });

    mocha.it('processing a request', async () => {
        // donate to the campaign
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: web3.utils.toWei('5', 'ether')});

        // raise a request
        await campaign.methods
            .createRequest('Buy food', web3.utils.toWei('2', 'ether'), accounts[1])
            .send({from: accounts[0], gas: '1000000'});

        // approve request
        await campaign.methods
            .approveRequest(0)
            .send({from: accounts[1], gas: '1000000'});

        // finalize a request
        await campaign.methods
            .finalizeRequest(0)
            .send({from: accounts[0], gas: '1000000'});

        // check balance of account 1
        let balance = await web3.eth.getBalance(accounts[1]);
        balance = parseFloat(web3.utils.fromWei(balance, 'ether'));

        console.log(balance);
        assert(balance > 96.9);
    });

});

