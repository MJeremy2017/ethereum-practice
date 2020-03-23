const assert = require('assert');
// local test network
const ganache = require('ganache-cli');
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

    [campaignAddress] = await factory.methods.createCampaign('100')
        .send({from: accounts[0], gas: '1000000'});  // accounts[0] created a new campaign

    // to retrieve a deployed contract by address
    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);

    factory.setProvider(provider);
    campaign.setProvider(provider);
});